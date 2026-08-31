class Solution:
    def minCost(self, n: int, i: int, d: int, c: int) -> int:
        # dp[x] stores the minimum cost needed to get exactly x characters.
        dp = [0] * (n + 1)

        # The screen starts empty, so getting 0 characters costs nothing.
        dp[0] = 0

        # Build the answer for every length from 1 to n.
        for x in range(1, n + 1):
            # Insert one character after reaching x - 1 characters.
            dp[x] = dp[x - 1] + i

            if x % 2 == 0:
                # For an even x, copying x / 2 characters gives exactly x.
                dp[x] = min(dp[x], dp[x // 2] + c)
            else:
                # Copy floor(x / 2) characters and insert one more character.
                dp[x] = min(dp[x], dp[x // 2] + c + i)

                # Copy ceil(x / 2) characters to get x + 1,
                # then delete one character to reach exactly x.
                dp[x] = min(dp[x], dp[x // 2 + 1] + c + d)

        # Return the minimum cost needed to get exactly n characters.
        return dp[n]