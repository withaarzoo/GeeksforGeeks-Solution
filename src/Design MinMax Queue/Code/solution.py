# Python3 implementation
from collections import deque

class SpecialQueue:
    def __init__(self):
        self.q = deque()      # main queue
        self.minD = deque()   # increasing deque for minima
        self.maxD = deque()   # decreasing deque for maxima

    # Insert element x at rear
    def enqueue(self, x: int) -> None:
        self.q.append(x)
        while self.minD and self.minD[-1] > x:
            self.minD.pop()
        self.minD.append(x)
        while self.maxD and self.maxD[-1] < x:
            self.maxD.pop()
        self.maxD.append(x)

    # Remove element from front
    def dequeue(self) -> None:
        if not self.q:
            return
        v = self.q.popleft()
        if self.minD and self.minD[0] == v:
            self.minD.popleft()
        if self.maxD and self.maxD[0] == v:
            self.maxD.popleft()

    # Get front element
    def getFront(self) -> int:
        return self.q[0] if self.q else -1

    # Get minimum element
    def getMin(self) -> int:
        return self.minD[0] if self.minD else -1

    # Get maximum element
    def getMax(self) -> int:
        return self.maxD[0] if self.maxD else -1
