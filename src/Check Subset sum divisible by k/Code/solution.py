class Solution:
    def divisibleByK(self, arr, k):

        # dp[r] tells whether some non-empty subset
        # can produce remainder r
        dp = [False] * k

        # Process every element
        for num in arr:

            # Copy previous DP states
            nxt = dp[:]

            # Current element alone forms a subset
            nxt[num % k] = True

            # Extend all previous subsets
            for r in range(k):
                if dp[r]:
                    new_rem = (r + num) % k
                    nxt[new_rem] = True

            # Update DP
            dp = nxt

            # If remainder 0 exists,
            # we found a valid subset
            if dp[0]:
                return True

        # No subset is divisible by k
        return False