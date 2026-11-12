'''
Structure of a Binary Search Tree node
class Node:
    def __init__(self, val):
        self.data = val
        self.right = self.left = None
        
'''

class Solution:
    def minDiff(self, root: 'Node', k: int) -> int:
        ans = float('inf')
        while root:
            ans = min(ans, abs(root.data - k))
            if root.data == k:
                return 0
            if k < root.data:
                root = root.left
            else:
                root = root.right
        return ans