'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def removekeys(self, root, l, r):
        # Base case
        if root is None:
            return None

        # If node value < l, discard left subtree and process right subtree
        if root.data < l:
            return self.removekeys(root.right, l, r)

        # If node value > r, discard right subtree and process left subtree
        if root.data > r:
            return self.removekeys(root.left, l, r)

        # Node is within range: recursively fix both children
        root.left = self.removekeys(root.left, l, r)
        root.right = self.removekeys(root.right, l, r)
        return root
