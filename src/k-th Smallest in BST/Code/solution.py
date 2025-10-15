'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def kthSmallest(self, root, k): 
        # Iterative inorder traversal using stack
        stack = []
        curr = root

        while curr is not None or stack:
            # push all left nodes
            while curr is not None:
                stack.append(curr)
                curr = curr.left

            # visit node
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.data  # found k-th smallest

            # move to right subtree
            curr = curr.right

        # if k is larger than number of nodes
        return -1
