class Solution:
    def minOperations(self, b):
        MOD = 10 ** 9 + 7
        n = len(b)

        # Marks visited indices
        vis = [False] * n

        # Stores maximum exponent required for every prime
        mx = {}

        # Find every cycle
        for i in range(n):

            if vis[i]:
                continue

            cur = i
            length = 0

            # Traverse current cycle
            while not vis[cur]:
                vis[cur] = True
                cur = b[cur] - 1
                length += 1

            # Prime factorization of cycle length
            x = length
            p = 2

            while p * p <= x:
                if x % p == 0:
                    cnt = 0

                    while x % p == 0:
                        x //= p
                        cnt += 1

                    mx[p] = max(mx.get(p, 0), cnt)

                p += 1

            # Remaining prime factor
            if x > 1:
                mx[x] = max(mx.get(x, 0), 1)

        ans = 1

        # Construct LCM modulo MOD
        for prime, exp in mx.items():
            for _ in range(exp):
                ans = (ans * prime) % MOD

        return ans