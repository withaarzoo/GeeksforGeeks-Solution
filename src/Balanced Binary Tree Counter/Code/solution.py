class Solution:
    def countBT(self, h: int) -> int:
        MOD = 10**9 + 7
        if h == 1:
            return 1
        prev2, prev1 = 1, 1
        for i in range(2, h + 1):
            curr = (prev1 * prev1 + 2 * prev1 * prev2) % MOD
            prev2 = prev1
            prev1 = curr
        return prev1
        