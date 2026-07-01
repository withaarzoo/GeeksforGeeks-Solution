class Solution:
    def maxSumSubarray(self, arr):

        # Maximum subarray ending here without deletion
        keep = arr[0]

        # Maximum subarray ending here after one deletion
        remove = 0

        # Final answer
        ans = arr[0]

        # Traverse the remaining elements
        for i in range(1, len(arr)):

            # Either remove current element or extend previous deleted subarray
            remove = max(keep, remove + arr[i])

            # Standard Kadane update
            keep = max(arr[i], keep + arr[i])

            # Update overall answer
            ans = max(ans, keep, remove)

        return ans