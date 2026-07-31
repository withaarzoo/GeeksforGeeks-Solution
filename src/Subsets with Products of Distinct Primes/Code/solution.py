class Solution:
    def countSubsets(self, arr):
        MOD = 1000000007

        # All prime numbers up to 30
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

        # mask[x] stores the prime factor mask
        # -1 means the number has repeated prime factors
        mask = [0] * 31

        # Precompute masks
        for x in range(2, 31):
            cur = x
            bits = 0
            ok = True

            for i, p in enumerate(primes):

                cnt = 0

                # Count how many times this prime divides the number
                while cur % p == 0:
                    cur //= p
                    cnt += 1

                # Repeated prime makes the number invalid
                if cnt > 1:
                    ok = False
                    break

                # Add this prime to the mask
                if cnt == 1:
                    bits |= (1 << i)

            mask[x] = bits if ok else -1

        # DP over all masks
        dp = [0] * (1 << 10)
        dp[0] = 1

        ones = 0

        for x in arr:

            # Count ones separately
            if x == 1:
                ones += 1
                continue

            # Ignore invalid numbers
            if mask[x] == -1:
                continue

            cur_mask = mask[x]

            # Traverse backwards so each element is used once
            for m in range((1 << 10) - 1, -1, -1):

                # Shared prime means repeated prime in product
                if m & cur_mask:
                    continue

                dp[m | cur_mask] = (dp[m | cur_mask] + dp[m]) % MOD

        # Sum every valid state
        ans = (sum(dp) - 1) % MOD

        # Every 1 can be chosen or skipped
        ans = (ans * pow(2, ones, MOD)) % MOD

        return ans