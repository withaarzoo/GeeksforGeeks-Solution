'''
class Node:
    def __init__(self,val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def findMaxSum(self, root): 
        # handle empty tree (if allowed). For given constraints there is at least 1 node.
        if root is None:
            return 0

        # initialize global maximum to a very small number
        self.global_max = -10**18

        def dfs(node):
            if node is None:
                return 0

            # max contribution from left and right; ignore negatives
            left = max(0, dfs(node.left))
            right = max(0, dfs(node.right))

            # best path that passes through this node
            current = node.data + left + right
            if current > self.global_max:
                self.global_max = current

            # return best single-sided path to parent
            return node.data + max(left, right)

        dfs(root)
        return self.global_max
