'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

from collections import deque

class Solution:
    def zigZagTraversal(self, root):
        result = []
        if not root:
            return result

        q = deque([root])
        leftToRight = True

        while q:
            level_size = len(q)
            level_vals = deque()  # appendleft is O(1)

            for _ in range(level_size):
                node = q.popleft()

                if leftToRight:
                    level_vals.append(node.data)
                else:
                    # appendleft reverses order for this level
                    level_vals.appendleft(node.data)

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            result.extend(level_vals)
            leftToRight = not leftToRight

        return result
