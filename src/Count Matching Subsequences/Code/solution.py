class Solution:
    def countWays(self, s1, s2):
        # Mod value given in the problem
        MOD = 1000000007

        n = len(s1)
        m = len(s2)

        # dp[i][j] = ways to form first j characters of s2
        # using first i characters of s1
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        # Empty string can always be formed
        for i in range(n + 1):
            dp[i][0] = 1

        # Fill the DP table
        for i in range(1, n + 1):
            for j in range(1, m + 1):

                # Skip current character
                dp[i][j] = dp[i - 1][j]

                # Include current character if both characters match
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD

        # Return the final answer
        return dp[n][m]