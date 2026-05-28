# Structure of binary tree node
'''
class Node:
    def __init__(self, item):
        self.data = item
        self.left = None
        self.right = None
'''

class Solution:
    
    # DFS traversal function
    def dfs(self, root, col, mp):
        
        # If node is None, stop recursion
        if not root:
            return
        
        # Add node value to current vertical column
        mp[col] = mp.get(col, 0) + root.data
        
        # Traverse left subtree
        self.dfs(root.left, col - 1, mp)
        
        # Traverse right subtree
        self.dfs(root.right, col + 1, mp)
    
    def verticalSum(self, root):
        
        # Dictionary stores:
        # key   -> column number
        # value -> vertical sum
        mp = {}
        
        # Start traversal from root at column 0
        self.dfs(root, 0, mp)
        
        # Sort columns from left-most to right-most
        sorted_cols = sorted(mp.keys())
        
        # Build final answer
        ans = []
        
        for col in sorted_cols:
            ans.append(mp[col])
        
        return ans