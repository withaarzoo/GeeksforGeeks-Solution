class Solution:
    def count(self, n: int, m: int) -> int:
        MOD = 1000000007

        # Store divisors for every number
        divisors = [[] for _ in range(m + 1)]

        # Precompute divisor lists
        for d in range(1, m + 1):
            for multiple in range(d, m + 1, d):
                divisors[multiple].append(d)

        # DP table
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        # Base case
        for v in range(1, m + 1):
            dp[1][v] = 1

        # Fill DP
        for length in range(2, n + 1):
            for v in range(1, m + 1):

                # Previous value is a divisor
                for d in divisors[v]:
                    dp[length][v] = (dp[length][v] + dp[length - 1][d]) % MOD

                # Previous value is a multiple
                for mult in range(v, m + 1, v):
                    dp[length][v] = (dp[length][v] + dp[length - 1][mult]) % MOD

                # Remove duplicate contribution
                dp[length][v] = (dp[length][v] - dp[length - 1][v]) % MOD

        # Sum all possible ending values
        return sum(dp[n][1:]) % MOD