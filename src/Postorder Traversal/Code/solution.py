'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def postOrder(self, root):
        # iterative single-stack postorder traversal
        result = []
        if root is None:
            return result

        stack = []
        curr = root
        lastVisited = None

        while curr is not None or stack:
            if curr is not None:
                stack.append(curr)
                curr = curr.left
            else:
                peekNode = stack[-1]
                # if right child exists and we haven't visited it yet, go right
                if peekNode.right is not None and lastVisited is not peekNode.right:
                    curr = peekNode.right
                else:
                    # visit node
                    result.append(peekNode.data)
                    lastVisited = peekNode
                    stack.pop()
        return result
