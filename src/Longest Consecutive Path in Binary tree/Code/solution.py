'''
Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.right = None
        self.data = val
        self.left = None
'''
class Solution:

    def __init__(self):
        # Stores the maximum consecutive path length
        self.ans = 1

    # DFS traversal
    def dfs(self, node, parent_value, length):

        # Stop if node does not exist
        if node is None:
            return

        # Continue the sequence if values are consecutive
        if node.data == parent_value + 1:
            length += 1
        else:
            # Otherwise start a new sequence
            length = 1

        # Update the maximum answer
        self.ans = max(self.ans, length)

        # Visit left subtree
        self.dfs(node.left, node.data, length)

        # Visit right subtree
        self.dfs(node.right, node.data, length)

    def longestConsecutive(self, root):
        # Empty tree
        if root is None:
            return -1

        # Start DFS from the root
        self.dfs(root, root.data - 1, 0)

        # Return -1 if no valid consecutive path exists
        return -1 if self.ans == 1 else self.ans