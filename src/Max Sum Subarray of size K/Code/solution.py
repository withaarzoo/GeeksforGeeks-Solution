class Solution:
    def maxSubarraySum(self, arr, k):
        n = len(arr)

        # Step 1: Sum of first k elements
        window_sum = sum(arr[:k])
        max_sum = window_sum

        # Step 2: Slide the window
        for i in range(k, n):
            window_sum += arr[i]        # add new element
            window_sum -= arr[i - k]    # remove old element
            max_sum = max(max_sum, window_sum)

        return max_sum
