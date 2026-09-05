class Solution:
    def longestSubseq(self, arr):
        # dp[x] stores the longest valid subsequence ending with value x.
        dp = {}

        # This stores the longest subsequence found so far.
        ans = 0

        # Process elements from left to right to maintain subsequence order.
        for x in arr:
            # Get the best subsequence ending at x - 1, or 0 if it does not exist.
            left = dp.get(x - 1, 0)

            # Get the best subsequence ending at x + 1, or 0 if it does not exist.
            right = dp.get(x + 1, 0)

            # Extend the better neighboring subsequence with the current value x.
            current = max(left, right) + 1

            # Store the longest subsequence ending with x.
            dp[x] = current

            # Update the overall maximum answer.
            ans = max(ans, current)

        # Return the length of the longest valid subsequence.
        return ans