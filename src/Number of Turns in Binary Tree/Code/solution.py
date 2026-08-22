''' Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    # This DFS finds a target and stores the L/R path from root to that target.
    def findPath(self, root, target, path):
        # An empty subtree cannot contain the target.
        if root is None:
            return False

        # Reaching the target means the current path is complete.
        if root.data == target:
            return True

        # Record the left move before searching the left subtree.
        path.append('L')

        # Keep this move only if the target exists on the left.
        if self.findPath(root.left, target, path):
            return True

        # Remove the failed left move before trying the right subtree.
        path.pop()

        # Record the right move before searching the right subtree.
        path.append('R')

        # Keep this move only if the target exists on the right.
        if self.findPath(root.right, target, path):
            return True

        # Remove the failed right move because this subtree also failed.
        path.pop()

        # Tell the previous recursive call that the target was not found here.
        return False

    def numberOfTurns(self, root, p, q):
        # Store directions from root to p and root to q.
        pathP = []
        pathQ = []

        # Build both root-to-node paths.
        self.findPath(root, p, pathP)
        self.findPath(root, q, pathQ)

        # Find the common prefix, which ends at the Lowest Common Ancestor.
        i = 0
        while i < len(pathP) and i < len(pathQ) and pathP[i] == pathQ[i]:
            i += 1

        # Build the exact sequence of directions while travelling from p to q.
        path = []

        # Move upward from p to the LCA, so add p's remaining directions in reverse.
        for j in range(len(pathP) - 1, i - 1, -1):
            path.append(pathP[j])

        # Move downward from the LCA to q using q's remaining directions normally.
        for j in range(i, len(pathQ)):
            path.append(pathQ[j])

        # Fewer than two edges means a turn is impossible.
        if len(path) < 2:
            return -1

        # Count every change from L to R or from R to L.
        turns = 0
        for j in range(1, len(path)):
            if path[j] != path[j - 1]:
                turns += 1

        # If no direction changed, both nodes lie on one straight path.
        return turns if turns > 0 else -1