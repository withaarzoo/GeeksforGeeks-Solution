from collections import defaultdict, deque

class Solution:
    def verticalOrder(self, root):

        if not root:
            return []

        mp = defaultdict(list)

        queue = deque()
        queue.append((root, 0))

        while queue:

            node, hd = queue.popleft()

            mp[hd].append(node.data)

            if node.left:
                queue.append((node.left, hd - 1))

            if node.right:
                queue.append((node.right, hd + 1))

        result = []

        for key in sorted(mp.keys()):
            result.append(mp[key])

        return result