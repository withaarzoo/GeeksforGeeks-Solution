'''
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None
'''

class Solution:
    def __init__(self):
        self.moves = 0

    def _dfs(self, node):
        # returns balance of subtree
        if node is None:
            return 0
        left_bal = self._dfs(node.left)
        right_bal = self._dfs(node.right)

        # each unit of left_bal/right_bal must be moved across the edge
        self.moves += abs(left_bal) + abs(right_bal)

        # subtree balance after each node keeps exactly one candy
        balance = node.data + left_bal + right_bal - 1
        return balance

    def distCandy(self, root):
        self.moves = 0
        self._dfs(root)
        return self.moves
