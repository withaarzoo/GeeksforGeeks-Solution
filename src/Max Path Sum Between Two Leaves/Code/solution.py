'''
# Node Class:
class Node:
    def _init_(self,val):
        self.data = val
        self.left = None
        self.right = None
        '''
class Solution:        
    def maxPathSum(self, root):
        self.res = float('-inf')
        def helper(node):
            if not node:
                return 0
            if not node.left and not node.right:
                return node.data
            left = helper(node.left)
            right = helper(node.right)
            if node.left and node.right:
                self.res = max(self.res, left + right + node.data)
                return max(left, right) + node.data
            return (left if node.left else right) + node.data
        helper(root)
        return -1 if self.res == float('-inf') else self.res