'''
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None

'''

class Solution:
    def constructTree(self, pre, post):
        n = len(pre)
        if n == 0:
            return None
        # value -> index in postorder for O(1) lookup
        pos = {val: i for i, val in enumerate(post)}

        def build(preL, preR, postL, postR):
            if preL > preR or postL > postR:
                return None
            root = Node(pre[preL])             # root is first in preorder
            if preL == preR:
                return root                    # leaf node
            leftRootVal = pre[preL + 1]        # root of left subtree
            idx = pos[leftRootVal]             # find it in postorder
            leftSize = idx - postL + 1         # nodes in left subtree
            # recursive splits based on sizes
            root.left  = build(preL + 1, preL + leftSize, postL, idx)
            root.right = build(preL + leftSize + 1, preR, idx + 1, postR - 1)
            return root

        return build(0, n - 1, 0, n - 1)
