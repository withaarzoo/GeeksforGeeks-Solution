from collections import deque

class Solution:
    def generateBinary(self, n):
        # Generate binary strings for numbers 1..n using BFS.
        result = []
        if n <= 0:
            return result

        q = deque(["1"])  # start with "1"
        for _ in range(n):
            s = q.popleft()     # take front
            result.append(s)    # store it
            q.append(s + "0")   # next with 0
            q.append(s + "1")   # next with 1
        return result
