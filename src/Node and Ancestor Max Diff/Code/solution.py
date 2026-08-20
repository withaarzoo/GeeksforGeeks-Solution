''' Structure of Binary Tree Node
class Node:
    def __init__(self,val):
        self.data = val
        self.left = None
        self.right = None
'''
class Solution:
    def maxDiff(self, root):
        # This list lets the nested DFS function update the answer.
        # I use negative infinity because the answer can be negative.
        ans = [float('-inf')]

        # This function returns the minimum value in the current subtree.
        def dfs(node):
            # A missing node should not affect the minimum calculation.
            if node is None:
                return float('inf')

            # Recursively find the minimum values in both subtrees.
            left_min = dfs(node.left)
            right_min = dfs(node.right)

            # If the left subtree exists, compare the current ancestor
            # with its smallest possible descendant from that subtree.
            if node.left is not None:
                ans[0] = max(ans[0], node.data - left_min)

            # If the right subtree exists, compare the current ancestor
            # with its smallest possible descendant from that subtree.
            if node.right is not None:
                ans[0] = max(ans[0], node.data - right_min)

            # Return the smallest value in this subtree to the parent.
            return min(node.data, left_min, right_min)

        # Traverse the whole tree.
        dfs(root)

        # Return the maximum ancestor - descendant difference.
        return ans[0]