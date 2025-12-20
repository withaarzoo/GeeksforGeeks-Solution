class Solution:
    def searchInsertK(self, arr, k):
        low, high = 0, len(arr) - 1

        while low <= high:
            mid = low + (high - low) // 2

            # If k is found
            if arr[mid] == k:
                return mid
            # Search right half
            elif arr[mid] < k:
                low = mid + 1
            # Search left half
            else:
                high = mid - 1

        # Insert position
        return low
