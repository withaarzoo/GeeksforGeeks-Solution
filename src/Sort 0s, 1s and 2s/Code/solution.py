class Solution:
    def sort012(self, arr):
        low = 0
        mid = 0
        high = len(arr) - 1

        # Process elements in one pass
        while mid <= high:
            if arr[mid] == 0:
                arr[low], arr[mid] = arr[mid], arr[low]
                low += 1
                mid += 1
            elif arr[mid] == 1:
                mid += 1
            else:  # arr[mid] == 2
                arr[mid], arr[high] = arr[high], arr[mid]
                high -= 1
