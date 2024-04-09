import torch
from datetime import datetime, timedelta
from repositories.neural_net.utils.dataset import CustomDataset, DataLoader
from schemas.tasks.todo.todo_task_schemas import TodoInfo


class NeuralNet(torch.nn.Module):
    def __init__(self) -> None:
        super(NeuralNet, self).__init__()
        self.layer = torch.nn.Linear(5, 4)
        self.load_state_dict(torch.load(
            './repositories/neural_net/weights/weights.pth'))

    def forward(self, data) -> int:
        ans = self.layer(data)
        return torch.nn.functional.softmax(ans, dim=1)

    def getDate(self, data: list[int], startDate: str, tasks: list[TodoInfo]) -> tuple[str | None, str | None]:
        taskNum = torch.tensor([data]).float()
        decision = torch.argmax(self(taskNum))
        if decision == 0:
            return (None, None)
        elif decision == 1:
            return (None, 'do-overdued')
        date = datetime.fromisoformat(startDate)
        dayType = decision
        while len(tasks) > 0:
            date += timedelta(days=1)
            overall = [t for t in tasks if t.due_date == date.isoformat()]
            ltasks = len([t for t in overall if t.priority == 'low'])
            mtasks = len([t for t in overall if t.priority == 'medium'])
            htasks = len([t for t in overall if t.priority == 'high'])
            taskNum = torch.tensor(
                [[len(overall), ltasks, mtasks, htasks, 0]]).float()
            decision = torch.argmax(self(taskNum))
            if decision == 0:
                if dayType == 3:
                    return (date.isoformat(), 'do-overdued')
                return (date.isoformat(), None)

            for t in overall:
                tasks.remove(t)
        date += timedelta(days=1)
        return (date.isoformat(), 'do-overdued') if dayType == 3 else (date.isoformat(), None)

    def train(self):
        train_dataset = CustomDataset(txt_file="data.txt")
        train_loader = DataLoader(train_dataset, batch_size=1, shuffle=True)
        criterion = torch.nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.parameters(), lr=0.001)
        for epoch in range(1001):
            for task, target in train_loader:
                optimizer.zero_grad()
                data = torch.stack(task, dim=1).type(torch.float32)
                output = self(data)
                loss = criterion(output, target)
                loss.backward()
                optimizer.step()

            if epoch % 100 == 0:
                torch.save(self.state_dict(),
                           f'./training/weights_{epoch}.pth')

    def test(self) -> None:
        test_dataset = CustomDataset(txt_file='test.txt')
        test_loader = DataLoader(test_dataset, batch_size=1, shuffle=True)
        tests = []
        true_res = []
        net_res = []
        for task, target in test_loader:
            true_res.append(target)
            data = torch.stack(task, dim=1).type(torch.float32)
            res = torch.argmax(self(data), dim=1)
            net_res.append(res)
            tests.append((data, res, target))
        print('Net:')
        print(net_res)
        print('\nReal:')
        print(true_res)
        print("\nTests:")
        for test in tests:
            print(test)
        accurancy = sum(1 for n, r in zip(net_res, true_res)
                        if n == r) / len(net_res)
        print(accurancy)

    def getWeights(self, epoch: int) -> None:
        weights = torch.load(f'./training/weights_{epoch}.pth')
        print(weights)
