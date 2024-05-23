from datetime import datetime, timedelta, timezone, UTC
from jose import JWTError, jwt
from passlib.context import CryptContext
from core.config import configs
from schemas.token.token_schemas import Tokens
from schemas.user.user_shemas import UserInfo
from wonderwords import RandomSentence

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str | None) -> str | None:
    return pwd_context.hash(password) if password is not None else None


def create_invitation(org_id: int):
    return jwt.encode({'org': org_id, 'exp': datetime.now(timezone.utc) + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)}, key=configs.SECRET_KEY, algorithm=configs.ALGORITHM)


def refresh_tokens(user) -> tuple:
    if user is None:
        return None, None
    access_token = jwt.encode({'user': user.id,
                               'pro': user.is_pro,
                               'role': user.organisation_role,
                               'exp': datetime.now(timezone.utc) + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES * 8)},
                              key=configs.SECRET_KEY, algorithm=configs.ALGORITHM)
    refresh_token = jwt.encode({'user': user.id,
                                'exp':  datetime.now(timezone.utc) + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)},
                               key=configs.SECRET_KEY, algorithm=configs.ALGORITHM)
    return access_token, refresh_token


def decode_token(token):
    if token is None:
        return None
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
        return None, None
    db_user = get_by_id(decoded_tok.get('user'))
    if db_user is None:
        return None, None
    access_token, refresh_token = refresh_tokens(UserInfo(
        id=db_user.id, email="", name="", access_token="", password="", is_pro=db_user.is_pro, organisation_role=db_user.organisation_role))
    return access_token, refresh_token


def get_current_user(tokens: Tokens, get_by_id):
    if tokens is None or tokens.refresh_token is None:
        return None, None
    access_token = tokens.access_token
    refresh_token = tokens.refresh_token
    if access_token is not None and refresh_token is not None and decode_token(access_token) is not None \
            and get_by_id(decode_token(access_token).get('user')) is not None:
        return access_token, refresh_token
    return 'refresh', None


def setCookie(Response, access_token, refresh_token, content):
    response = Response(status_code=200, content=content)
    response.set_cookie(key=configs.ACCESS_TOKEN, domain=configs.DOMAIN,
                        value=access_token,
                        expires=(
                            datetime.now(UTC) + timedelta(minutes=configs.ACCESS_TOKEN_EXPIRE_MINUTES)).ctime())
    response.set_cookie(key=configs.REFRESH_TOKEN, value=refresh_token,
                        httponly=True, secure=True, samesite='none', domain=configs.DOMAIN,
                        expires=(
                            datetime.now(UTC) + timedelta(minutes=configs.REFRESH_TOKEN_EXPIRE_MINUTES)).ctime())
    return response


def deleteCookie(Response):
    Response.delete_cookie(key=configs.ACCESS_TOKEN,
                           domain=configs.DOMAIN, samesite='lax')
    Response.delete_cookie(key=configs.REFRESH_TOKEN, httponly=True,
                           domain=configs.DOMAIN, secure=True, samesite='none')
    return Response


def generateProCodes() -> list[str]:
    codes: list[str] = list()
    generator = RandomSentence()
    for _ in range(10):
        code = generator.bare_bone_with_adjective()
        while codes in codes:
            code = generator.bare_bone_with_adjective()
        codes.append(code)
    return codes
