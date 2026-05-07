# Definition for Node
class Node:
    def __init__(self, x):
        self.data = x
        self.left = None
        self.right = None

class Solution:
    
    # Function to check whether two trees are identical
    def isSame(self, a, b):
        
        # If both nodes are None
        # trees match till here
        if a is None and b is None:
            return True
        
        # If one node is None
        # structure becomes different
        if a is None or b is None:
            return False
        
        # Node values must match
        if a.data != b.data:
            return False
        
        # Recursively compare left and right subtrees
        return (self.isSame(a.left, b.left) and
                self.isSame(a.right, b.right))
    
    def isSubTree(self, root1, root2):
        
        # Empty tree is always a subtree
        if root2 is None:
            return True
        
        # Main tree finished
        if root1 is None:
            return False
        
        # Check if both trees are identical
        if self.isSame(root1, root2):
            return True
        
        # Otherwise continue searching
        return (self.isSubTree(root1.left, root2) or
                self.isSubTree(root1.right, root2))