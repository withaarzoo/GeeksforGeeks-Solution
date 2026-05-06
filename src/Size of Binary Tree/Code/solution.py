"""
Definition for Node
class Node:
    def _init_(self,val):
        self.data = val
        self.left = None
        self.right = None
"""
class Solution:
    def getSize(self, root):
        
        # If node is None, no node is present
        if root is None:
            return 0
        
        # Recursively count nodes in left subtree
        left_size = self.getSize(root.left)
        
        # Recursively count nodes in right subtree
        right_size = self.getSize(root.right)
        
        # Total nodes =
        # left subtree + right subtree + current node
        return left_size + right_size + 1
         