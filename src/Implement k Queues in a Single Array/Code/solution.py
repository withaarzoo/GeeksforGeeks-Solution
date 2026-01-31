class kQueues:
    def __init__(self, n, k):
        self.arr = [0] * n
        self.next = list(range(1, n)) + [-1]
        self.front = [-1] * k
        self.rear = [-1] * k
        self.freeSpot = 0

    def enqueue(self, x, i):
        if self.freeSpot == -1:
            return

        index = self.freeSpot
        self.freeSpot = self.next[index]

        if self.front[i] == -1:
            self.front[i] = index
        else:
            self.next[self.rear[i]] = index

        self.next[index] = -1
        self.rear[i] = index
        self.arr[index] = x

    def dequeue(self, i):
        if self.front[i] == -1:
            return -1

        index = self.front[i]
        self.front[i] = self.next[index]

        self.next[index] = self.freeSpot
        self.freeSpot = index

        return self.arr[index]

    def isEmpty(self, i):
        return self.front[i] == -1

    def isFull(self):
        return self.freeSpot == -1
