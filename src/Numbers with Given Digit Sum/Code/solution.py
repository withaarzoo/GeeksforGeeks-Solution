class Solution:
    def countWays(self, n, sum):
        
        # Impossible if required sum is too large
        if sum > 9 * n:
            return -1

        # dp[i][j] = ways to form i digits with digit sum j
        dp = [[0] * (sum + 1) for _ in range(n + 1)]

        # Base case
        dp[0][0] = 1

        # Fill DP table
        for i in range(n):
            for s in range(sum + 1):
                if dp[i][s] == 0:
                    continue

                # Try every possible digit
                for d in range(10):
                    if s + d <= sum:
                        dp[i + 1][s + d] += dp[i][s]

        total = dp[n][sum]

        # Single digit case
        if n == 1:
            return total if total else -1

        # DP for remaining digits when first digit is fixed as 0
        dp_zero = [[0] * (sum + 1) for _ in range(n)]

        dp_zero[0][0] = 1

        for i in range(n - 1):
            for s in range(sum + 1):
                if dp_zero[i][s] == 0:
                    continue

                for d in range(10):
                    if s + d <= sum:
                        dp_zero[i + 1][s + d] += dp_zero[i][s]

        ans = total - dp_zero[n - 1][sum]

        return ans if ans else -1