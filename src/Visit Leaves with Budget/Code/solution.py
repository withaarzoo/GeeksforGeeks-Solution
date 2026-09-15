''' Binary Tree Node Structure
class Node:
    def __init__(self,val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    # helper that walks the tree and records every leaf depth
    def collect(self, node, depth, leaves):
        if not node:
            return
        if not node.left and not node.right:   # leaf found
            leaves.append(depth)
            return
        self.collect(node.left, depth + 1, leaves)
        self.collect(node.right, depth + 1, leaves)

    def getCount(self, root, k):
        leaves = []
        self.collect(root, 1, leaves)          # start counting from level 1
        leaves.sort()                          # ascending so we take cheapest first
        count = 0
        for cost in leaves:
            if cost > k:
                break
            k -= cost
            count += 1
        return count