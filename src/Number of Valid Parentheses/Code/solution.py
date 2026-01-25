class Solution:
    def findWays(self, n):
        # If n is odd, no valid parentheses possible
        if n % 2 != 0:
            return 0

        pairs = n // 2
        dp = [0] * (pairs + 1)

        # Base case
        dp[0] = 1

        # Catalan DP calculation
        for i in range(1, pairs + 1):
            for j in range(i):
                dp[i] += dp[j] * dp[i - j - 1]

        return dp[pairs]
