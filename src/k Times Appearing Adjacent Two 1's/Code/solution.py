class Solution:
    def countStrings(self, n, k): 
        MOD = 1000000007

        # dp[length][pairs][lastBit]
        dp = [[[0] * 2 for _ in range(k + 1)] for _ in range(n + 1)]

        # Base case
        dp[1][0][0] = 1
        dp[1][0][1] = 1

        # Build strings of increasing length
        for length in range(2, n + 1):
            for pairs in range(k + 1):

                # Previous last bit was 0

                # Append 0
                dp[length][pairs][0] = (
                    dp[length][pairs][0] + dp[length - 1][pairs][0]
                ) % MOD

                # Append 1
                dp[length][pairs][1] = (
                    dp[length][pairs][1] + dp[length - 1][pairs][0]
                ) % MOD

                # Previous last bit was 1

                # Append 0
                dp[length][pairs][0] = (
                    dp[length][pairs][0] + dp[length - 1][pairs][1]
                ) % MOD

                # Append 1 creates one extra adjacent "11"
                if pairs > 0:
                    dp[length][pairs][1] = (
                        dp[length][pairs][1] + dp[length - 1][pairs - 1][1]
                    ) % MOD

        # Count strings ending with either 0 or 1
        return (dp[n][k][0] + dp[n][k][1]) % MOD