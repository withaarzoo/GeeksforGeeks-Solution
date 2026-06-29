class Solution:
    def maxDotProduct(self, a, b):
        n = len(a)
        m = len(b)

        # Impossible state
        NEG = -10**9

        # DP array
        dp = [NEG] * (m + 1)

        # Using zero elements from b gives 0
        dp[0] = 0

        # Process every element of a
        for i in range(1, n + 1):

            # Copy previous row
            ndp = dp[:]

            # Try every possible match
            for j in range(1, min(i, m) + 1):

                # Skip current a
                ndp[j] = max(ndp[j], dp[j])

                # Match current a with current b
                if dp[j - 1] != NEG:
                    ndp[j] = max(
                        ndp[j],
                        dp[j - 1] + a[i - 1] * b[j - 1]
                    )

            # Update DP
            dp = ndp

        # Final answer
        return dp[m]