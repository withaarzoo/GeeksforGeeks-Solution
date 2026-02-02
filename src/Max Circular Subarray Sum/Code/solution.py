class Solution:
    def maxCircularSum(self, arr):
        if not arr:
            return 0

        total = arr[0]
        max_ending = max_so_far = arr[0]
        min_ending = min_so_far = arr[0]

        for x in arr[1:]:
            # Kadane for maximum subarray
            max_ending = max(x, max_ending + x)
            max_so_far = max(max_so_far, max_ending)

            # Kadane for minimum subarray
            min_ending = min(x, min_ending + x)
            min_so_far = min(min_so_far, min_ending)

            total += x

        # If all numbers are negative, max_so_far is the maximum single element
        if max_so_far < 0:
            return max_so_far

        # Otherwise best of non-wrapping and wrapping cases
        wrap_max = total - min_so_far
        return max(max_so_far, wrap_max)
