import torch.nn.init as init
from torch.nn import Linear
from torch.utils.data import Dataset, DataLoader


def init_weights(model):
    if isinstance(model, Linear) == False:
        return
    init.xavier_normal_(model.weight)
    if (model.bias is not None):
        init.constant_(model.bias, 0)


class CustomDataset(Dataset):
    def __init__(self, txt_file: str, root_dir: str = "", transform=None):
        self.txt_file = txt_file
        self.root_dir = root_dir
        self.transform = transform
        self.data = []
        self.label = []

        with open(txt_file, "r") as file:
            for line in file:
                line = line.strip().split()
                self.data.append(list(map(int, line[:5])))
                self.label.append(int(line[-1]))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx], self.label[idx]
