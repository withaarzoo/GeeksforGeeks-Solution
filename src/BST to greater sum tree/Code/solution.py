'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def transformTree(self, root):
        # accumulator for sum of nodes already visited (greater nodes)
        acc = 0

        # use nested function to capture acc via nonlocal
        def dfs(node):
            nonlocal acc
            if not node:
                return
            # visit right subtree first (nodes greater than current)
            dfs(node.right)

            # replace node.data with sum of nodes greater than it (acc)
            original = node.data
            node.data = acc

            # add the original value to acc so smaller nodes get it included
            acc += original

            # traverse left subtree
            dfs(node.left)

        dfs(root)
