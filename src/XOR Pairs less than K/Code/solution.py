class Solution:
    MAX_BIT = 15  # because values <= 5*10^4 < 2^16

    class Node:
        __slots__ = ("child", "cnt")
        def __init__(self):
            # child[0] and child[1]
            self.child = [None, None]
            self.cnt = 0  # how many numbers pass through this node

    def _insert(self, root, x: int) -> None:
        """Insert number x into the binary trie."""
        cur = root
        for b in range(self.MAX_BIT, -1, -1):
            bit = (x >> b) & 1
            if cur.child[bit] is None:
                cur.child[bit] = self.Node()
            cur = cur.child[bit]
            cur.cnt += 1  # one more number passes here

    def _count_less(self, root, x: int, k: int) -> int:
        """
        Count how many numbers y already in trie satisfy:
        (x XOR y) < k
        """
        cur = root
        res = 0
        for b in range(self.MAX_BIT, -1, -1):
            if cur is None:
                break
            bit_x = (x >> b) & 1
            bit_k = (k >> b) & 1

            if bit_k == 1:
                # Case 1: XOR bit = 0 < 1 -> y's bit = bit_x
                same = cur.child[bit_x]
                if same is not None:
                    res += same.cnt

                # Case 2: XOR bit = 1 == 1 -> y's bit = 1 - bit_x, keep comparing
                cur = cur.child[1 - bit_x]
            else:
                # bit_k == 0: XOR bit must be 0 -> y's bit = bit_x
                cur = cur.child[bit_x]
        return res

    def cntPairs(self, arr, k):
        if k == 0:
            return 0

        root = self.Node()
        ans = 0

        for x in arr:
            ans += self._count_less(root, x, k)
            self._insert(root, x)

        return ans
