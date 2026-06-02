class Solution:
    def sumDiffPairs(self, arr, k):

        # Sort the array first
        arr.sort()

        ans = 0
        i = len(arr) - 1

        # Start from the largest element
        while i > 0:

            # Check if adjacent elements form a valid pair
            if arr[i] - arr[i - 1] < k:

                # Add both numbers to answer
                ans += arr[i] + arr[i - 1]

                # Skip both used elements
                i -= 2
            else:

                # Current element remains unused
                i -= 1

        return ans