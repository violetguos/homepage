---
title: "A World without Tensorflow or Pytorch"
date: "2024-05-03"
coverImage: "./dogscience.png"
category: ["machine learning"]
---

Before neural netowrk frameworks were released, there was no effective way to automatically run gradient descent, defined model layer dimension, or initialize weights. All these features are baked into Tensorflow and Pytorch.

In a world without any neural network frameworks, we need to understand the fundamentals of a fully connected layer (aka MLP, neural network).

The following example assumes that we use the MNIST dataset.

# fully connected layer

A matrix represents an image of a digit, and each cell is a pixel value. The image has dimension n by d.

Before passing through the activation function, we need to multiply the input by the weight and add the bias offset.

Mathmatically, it is represented like so

Wx^T + b

W: dh by d, where dh is the dimension of the hidden layer
x: n by d
b: dh by n

which yields a dh by n matrix.

The activation is applied per element of the matrix

```python
def relu(pre_activation):
    '''
    Relu using only numpy.
    '''
    relu_output = np.zeros(pre_activation.shape)
    relu_flat = relu_output.flatten()
    for i, neuron in enumerate(pre_activation.flatten()):
        if neuron > 0:
            relu_flat[i] = neuron
    relu_output = relu_flat.reshape(pre_activation.shape)
    return relu_output
```

The output after activation retains the same input matrix dimenion, in this case dh by n

# weight initialization

If we initialized all the weights to 0, backpropogation will always be 0. There is nothing to learn.

Instead, a simple and effective initialization uses the hidden layer dimensions, and samples a matrix from a normal distribution, with the value bounded by the square root of $\frac{6}{sum of layer dimensions}$

```python
def glorot_init(d, dh1, dh2, m):
    dl_1 = np.sqrt((6/(d + dh1)))
    W_1 = np.random.uniform((-1)*dl_1, dl_1, (dh1, d))
    return W_1
```

The intuition behind this design is the forward propagation Wx^T + b will sum over every row in W, so having the layer's dimension in the denominator will prevent the result Wx^T from exploding.

# Output

Typically, we use softmax function to essentially _cast_ a set of values into a probability distribution.
The output will retain the shape of the input to softmax, and each value can be interpreted as a probability.
The index of the maximum probability is the index of the predicted category.

```python
def softmax(pre_activation):
    '''
    Numerically stable because subtracting the max value makes bit overflow impossible,
    we will only have non-positive values in the vector
    '''
    exps = np.exp(pre_activation - np.max(pre_activation))
    return exps / np.sum(exps)
```

# Backpropagation

The probability of an image of handwritten "1" to be 1 should be 100%.
We want to maximize this probability. Since we have the softmax representation from the forward propagation's output, we want to maximize the softmax, aka we want softmax of the correct class to equal 1.

The following will require you thinking like a true mathematician. In order to maximize this probaility, we can minimize negative of the log-likelihood to achieve the same effect.

We don't have a magically formula to find the weight values to minimize the negative log likehood. Instead, we modify the values so we move closer to the minimum log likelihood iteration by iteration. This can be done using gradient descent. For every iteration, we update the value of the weights by the value of this gradient.
If you are interested in the derivations, visit [this blog](https://www.highonscience.com/blog/2021/06/18/ml-loss-function-cheat-sheet/#log-loss)

```python
    def backprop(self, batch_data, batch_target):
        '''
        dimensions:
        o_s: m x1
        grad_oa : m x 1
        hs: dh x 1
        grad_w2: m x dh
        grad_oa: m x n
        grad_b2: m x n
        grad_oa: m x n
        W(2): m x dh
        grad_hs: dh x n
        grad_oa: m x n
        grad_ha: dh x n
        x : n x d
        grad_W1: dh x d
        grad_ha: dh x n
        grad_b1: dh x n
        '''
        self.grad_oa = self.o_s - batch_target

        # hidden layer 3
        self.grad_W3 = np.outer(self.grad_oa, self.h_s2.T)
        self.grad_b3 = self.grad_oa

        self.grad_hs2 = np.dot(self.W_3.T, self.grad_oa)
        h_a_stack2 = np.where(self.h_a2 > 0, 1, 0)
        self.grad_ha2 = np.multiply(self.grad_hs2, h_a_stack2)

        self.grad_W2 = np.outer(self.grad_ha2, self.h_s1.T)
        self.grad_b2 = self.grad_ha2

        self.grad_hs1 = np.dot(self.W_2.T , self.grad_ha2)
        h_a_stack1 = np.where(self.h_a1 > 0, 1, 0)
        self.grad_ha1 = np.multiply(self.grad_hs1, h_a_stack1)

        # hidden layer 1
        self.grad_W1 = np.outer(self.grad_ha1, batch_data)
        self.grad_b1 = self.grad_ha1
```

After we obtained the gradients for each layer, we apply the _descent_ by subtracting it from the weights. The learning rate serves as a control, and can be designed to be adaptive according to the shape of the loss function to accelerate or decelrate the descent.

```python
    def update_weights(self):
        self.W_1 -= self.grad_W1 * self.learning_rate
        self.W_2 -= self.grad_W2 * self.learning_rate
        self.W_3 -= self.grad_W3 * self.learning_rate

        self.b_1 -= self.grad_b1 * self.learning_rate
        self.b_2 -= self.grad_b2 * self.learning_rate
        self.b_3 -= self.grad_b3 * self.learning_rate
```

The update is performed for every single image (aka our input data) over a number of times. Each complete set is referred to as an epoch. The number of epoch is usually determined at run time using early stopping. There is no consensus on how many epochs to run, and more isn't always better.

There is probably no occasion where we will actually write everything using numpy and pretend we don't have tensorflow or pytorch. This post aims to provide some visbility into a simple neural network training works, and why the frameworks are appreciated in the ML community.
