class Solution:
    class Node:
        def __init__(self, freq, idx):
            self.freq = freq
            self.idx = idx
            self.left = None
            self.right = None

        # Custom comparison for heap
        def __lt__(self, other):
            if self.freq == other.freq:
                return self.idx < other.idx
            return self.freq < other.freq

    def buildCodes(self, root, code, ans):
        if not root:
            return

        # Leaf node
        if root.left is None and root.right is None:
            ans.append(code)
            return

        self.buildCodes(root.left, code + "0", ans)
        self.buildCodes(root.right, code + "1", ans)

    def huffmanCodes(self, s, f):
        import heapq

        heap = []
        n = len(s)

        # Push all characters into heap
        for i in range(n):
            heapq.heappush(heap, self.Node(f[i], i))

        # Special case
        if n == 1:
            return ["0"]

        # Build Huffman Tree
        while len(heap) > 1:
            left = heapq.heappop(heap)
            right = heapq.heappop(heap)

            parent = self.Node(
                left.freq + right.freq,
                min(left.idx, right.idx)
            )

            parent.left = left
            parent.right = right

            heapq.heappush(heap, parent)

        ans = []
        self.buildCodes(heap[0], "", ans)

        return ans