from collections import deque

class Solution:
    def rotateDeque(self, dq, type, k):
        """
        dq : collections.deque (expected)
        type: 1 => right rotation, 2 => left rotation
        k: number of rotations
        """
        n = len(dq)
        if n == 0:
            return
        r = k % n
        if r == 0:
            return

        # collections.deque has a rotate method implemented in C.
        # rotate(n) moves elements to the right by n (positive => right, negative => left)
        if type == 1:
            dq.rotate(r)   # right rotate by r
        elif type == 2:
            dq.rotate(-r)  # left rotate by r
