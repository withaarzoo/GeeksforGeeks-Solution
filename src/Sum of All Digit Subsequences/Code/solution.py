class Solution:

    def subsequenceSum(self, s):
        MOD = 10**9 + 7
        total = 0
        n = len(s)
        for ch in s:
            total = (total + int(ch)) % MOD
        pow2 = 1
        for _ in range(n - 1):
            pow2 = (pow2 * 2) % MOD
        return (total * pow2) % MOD