class Solution:
    def countSubsequences(self, s, n):
        # Store every count modulo 1e9 + 7.
        MOD = 1000000007

        # dp[r] stores how many non-empty subsequences formed so far
        # have numeric value with remainder r when divided by n.
        dp = [0] * n

        # Process digits from left to right to preserve their original order.
        for ch in s:
            # Convert the current character into an integer digit.
            digit = int(ch)

            # Keep all old subsequences because each one can ignore
            # the current digit and remain unchanged.
            next_dp = dp[:]

            # Append the current digit to every existing subsequence.
            for remainder in range(n):
                # If the old remainder is r, appending digit d changes it
                # to (r * 10 + d) modulo n.
                new_remainder = (remainder * 10 + digit) % n

                # Add all subsequences from this old remainder state.
                next_dp[new_remainder] = (
                    next_dp[new_remainder] + dp[remainder]
                ) % MOD

            # The current digit alone is also a valid new subsequence.
            next_dp[digit % n] = (next_dp[digit % n] + 1) % MOD

            # Use this state while processing the next digit.
            dp = next_dp

        # Remainder 0 means the subsequence is divisible by n.
        return dp[0]