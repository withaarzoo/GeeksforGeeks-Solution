'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def dfs(self, root):
        """
        Returns a tuple (take, notTake)
        take: max sum if we include this node
        notTake: max sum if we don't include this node
        """
        if root is None:
            return (0, 0)
        l_take, l_not = self.dfs(root.left)
        r_take, r_not = self.dfs(root.right)

        # If we take this node, we can't take its children
        take = root.data + l_not + r_not
        # If we don't take this node, we can choose best for each child
        notTake = max(l_take, l_not) + max(r_take, r_not)
        return (take, notTake)

    def getMaxSum(self, root):
        take, notTake = self.dfs(root)
        return max(take, notTake)
