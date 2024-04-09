from neural_net import NeuralNet, torch

net = NeuralNet()
# net.apply(init_weights)
# net.train()
net.load_state_dict(torch.load('./weights/weights.pth'))
net.test()
