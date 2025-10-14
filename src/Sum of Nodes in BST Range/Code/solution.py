"""
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
"""

class Solution:
    def nodeSum(self, root, l, r):
        if root is None:
            return 0  # base case
        # If current node's value is less than l, entire left subtree is out of range
        if root.data < l:
            return self.nodeSum(root.right, l, r)
        # If current node's value is greater than r, entire right subtree is out of range
        if root.data > r:
            return self.nodeSum(root.left, l, r)
        # Otherwise, node is inside range; include it and recurse both sides
        return root.data + self.nodeSum(root.left, l, r) + self.nodeSum(root.right, l, r)
