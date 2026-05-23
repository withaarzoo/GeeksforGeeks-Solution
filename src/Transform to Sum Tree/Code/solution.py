# Structure for Tree Node
'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

'''
class Solution:
    
    # Helper function
    # Returns total original subtree sum
    def solve(self, root):
        
        # Base case
        if root is None:
            return 0
        
        # Get sum from left subtree
        left_sum = self.solve(root.left)
        
        # Get sum from right subtree
        right_sum = self.solve(root.right)
        
        # Store original node value
        original_value = root.data
        
        # Update current node value
        root.data = left_sum + right_sum
        
        # Return total original subtree sum
        return original_value + root.data
    
    def toSumTree(self, root):
        
        # Start recursive conversion
        self.solve(root)