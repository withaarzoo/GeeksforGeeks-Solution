class Solution:
    def cntSubsets(self, arr: List[int], l: int, r: int) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        freq = [0] * (n + 1)
        for x in arr:
            if x <= n:
                freq[x] += 1
        p2 = [1] * (n + 1)
        for i in range(1, n + 1):
            p2[i] = p2[i - 1] * 2 % MOD
        def modpow(base, exp, mod):
            res = 1
            base %= mod
            while exp > 0:
                if exp & 1:
                    res = res * base % mod
                base = base * base % mod
                exp >>= 1
            return res
        ans = 0
        cur_prod = 1
        cum = 0
        for k in range(r + 1):
            if k > 0:
                if freq[k - 1] == 0:
                    cur_prod = 0
                else:
                    cur_prod = cur_prod * (p2[freq[k - 1]] - 1 + MOD) % MOD
            cum += freq[k]
            if cur_prod != 0:
                free = p2[n] * modpow(p2[cum], MOD - 2, MOD) % MOD
                ways = cur_prod * free % MOD
                if k >= l:
                    ans = (ans + ways) % MOD
        return ans