class Solution:

    def optimalKeys(self, n: int):

        # dp[i] stores the maximum number of A's
        # possible using exactly i key presses
        dp = [0] * (n + 1)

        # Base case:
        # Simply press 'A'
        for i in range(1, n + 1):
            dp[i] = i

        # Build DP table
        for i in range(1, n + 1):

            # Try every possible breakpoint
            for j in range(1, i - 2):

                # Copy-paste multiplication logic
                dp[i] = max(dp[i], dp[j] * (i - j - 1))

        # Return final answer
        return dp[n]