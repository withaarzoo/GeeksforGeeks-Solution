'''
Binary Tree Node Structure
class Node:
    def __init__(self):
        self.data = None
        self.left = None
        self.right = None
'''
        
class Solution:
    def absDiff(self, root):
        # prev stores the value of the previously visited node
        # minDiff keeps the smallest absolute difference found so far
        self.prev = -1                        # -1 means "no previous node yet"
        self.minDiff = float('inf')

        def inorder(node):
            if not node:
                return                        # base case: empty subtree

            inorder(node.left)                # 1. finish left subtree first

            # 2. process current node
            if self.prev != -1:               # only compute if we already saw a node
                diff = node.data - self.prev
                if diff < self.minDiff:
                    self.minDiff = diff
            self.prev = node.data             # remember this node for the next one

            inorder(node.right)               # 3. now go to right subtree

        inorder(root)
        return self.minDiff