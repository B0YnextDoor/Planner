from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from core.config import configs
from schemas.token.token_schemas import DoubleToken, TokenBase
from schemas.user.user_shemas import UserInfo

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def refresh_tokens(user) -> tuple:
    if user is None:
        return None, None
    access_token = jwt.encode({'user': user.id,
                               'pro': user.is_pro,
                               'role': user.organisation_role,
                               'exp': datetime.utcnow() + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)},
                              key=configs.SECRET_KEY, algorithm=configs.ALGORITHM)
    refresh_token = jwt.encode({'user': user.id,
                                'exp':  datetime.utcnow() + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)},
                               key=configs.SECRET_KEY, algorithm=configs.ALGORITHM)
    return access_token, refresh_token


def decode_token(token):
    try:
        return jwt.decode(token, configs.SECRET_KEY, algorithms=[configs.ALGORITHM])
    except JWTError:
        return None


def verify_user(db_password: str, password, db_user) -> tuple:
    if db_password is None or verify_password(password, db_password) == False:
        return None, 'wrong password'
    return refresh_tokens(db_user)


def check_refresh_token(token: str, get_by_id):
    decoded_tok = decode_token(token)
    if decoded_tok is None:
        return None, None, None
    db_user = get_by_id(decoded_tok.get('user'))
    if db_user is None:
        return None, None, None
    return db_user.id, db_user.is_pro, db_user.organisation_role


def get_current_user(tokens: DoubleToken, get_by_id):
    if tokens is None:
        return None, None
    access_token = tokens.access_token
    refresh_token = tokens.refresh_token
    if access_token is not None and refresh_token is not None and decode_token(access_token) is not None \
            and get_by_id(decode_token(access_token).get('user')) is not None:
        return access_token, refresh_token
    id, isPro, organisationRole = check_refresh_token(refresh_token, get_by_id)
    if id is None:
        return None, None
    access_token, refresh_token = refresh_tokens(UserInfo(
        id=id, email="", name="", access_token="", password="", is_pro=isPro, organisation_role=organisationRole))
    return access_token, refresh_token


def setCookie(Response, access_token, refresh_token, content):
    response = Response(status_code=200, content={'payload': content})
    response.set_cookie(key=configs.ACCESS_TOKEN,
                        value=access_token,
                        expires=(
                            datetime.utcnow() + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)).ctime(), domain='127.0.0.1')
    response.set_cookie(key=configs.REFRESH_TOKEN, value=refresh_token,
                        httponly=True, domain='127.0.0.1', secure=True,
                        expires=(
                            datetime.utcnow() + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)).ctime(), samesite='none')
    return response


def deleteCookie(Response):
    Response.delete_cookie(key=configs.ACCESS_TOKEN,
                           domain='127.0.0.1', samesite='lax')
    Response.delete_cookie(key=configs.REFRESH_TOKEN, httponly=True,
                           domain='127.0.0.1', secure=True, samesite='none')
    return Response
