class Solution:
    def kthMissing(self, arr, k):
        left, right = 0, len(arr) - 1

        # Binary search
        while left <= right:
            mid = (left + right) // 2

            # Missing numbers before arr[mid]
            missing = arr[mid] - (mid + 1)

            if missing < k:
                left = mid + 1
            else:
                right = mid - 1

        # Final answer
        return left + k
