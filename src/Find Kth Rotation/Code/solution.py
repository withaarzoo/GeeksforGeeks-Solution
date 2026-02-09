class Solution:
    def findKRotation(self, arr):
        low, high = 0, len(arr) - 1

        # Binary search for minimum element
        while low < high:
            mid = (low + high) // 2

            # Minimum lies in right half
            if arr[mid] > arr[high]:
                low = mid + 1
            # Minimum lies in left half or mid
            else:
                high = mid

        # Index of smallest element = number of rotations
        return low
