'''
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None
'''

from collections import deque

class Solution:
    def bottomView(self, root):
        if not root:
            return []

        hd_value = {}             # hd -> last seen node.data
        q = deque([(root, 0)])    # queue of tuples (node, horizontal_distance)
        min_hd = 0
        max_hd = 0

        while q:
            node, hd = q.popleft()
            # Overwrite value at hd. BFS guarantees later (deeper / later in level-order)
            # nodes overwrite earlier ones: exactly what bottom view requires.
            hd_value[hd] = node.data

            if node.left:
                q.append((node.left, hd - 1))
                if hd - 1 < min_hd: min_hd = hd - 1
            if node.right:
                q.append((node.right, hd + 1))
                if hd + 1 > max_hd: max_hd = hd + 1

        # Collect from leftmost hd to rightmost hd
        return [hd_value[hd] for hd in range(min_hd, max_hd + 1)]
