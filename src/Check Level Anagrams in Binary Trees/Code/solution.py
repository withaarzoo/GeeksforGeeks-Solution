"""
Structure of binary tree Node
class Node:
    def __init__(self, x: int):
        self.data = x
        self.left = self.right = None
"""
class Solution:
    def areAnagrams(self, root1, root2):
        if not root1 and not root2:
            return True
        if not root1 or not root2:
            return False
        from collections import deque
        q1 = deque([root1])
        q2 = deque([root2])
        while q1 and q2:
            sz1, sz2 = len(q1), len(q2)
            if sz1 != sz2:
                return False
            a, b = [], []
            for _ in range(sz1):
                n1 = q1.popleft()
                n2 = q2.popleft()
                a.append(n1.data)
                b.append(n2.data)
                if n1.left:
                    q1.append(n1.left)
                if n1.right:
                    q1.append(n1.right)
                if n2.left:
                    q2.append(n2.left)
                if n2.right:
                    q2.append(n2.right)
            a.sort()
            b.sort()
            if a != b:
                return False
        return not q1 and not q2