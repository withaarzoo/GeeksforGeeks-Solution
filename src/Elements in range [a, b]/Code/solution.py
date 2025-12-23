class Solution:
    def cntInRange(self, arr, queries):

        # Step 1: Sort the array
        arr.sort()
        result = []

        for a, b in queries:
            left = self.lower_bound(arr, a)
            right = self.upper_bound(arr, b)
            result.append(right - left)

        return result

    def lower_bound(self, arr, target):
        l, r = 0, len(arr)
        while l < r:
            mid = (l + r) // 2
            if arr[mid] < target:
                l = mid + 1
            else:
                r = mid
        return l

    def upper_bound(self, arr, target):
        l, r = 0, len(arr)
        while l < r:
            mid = (l + r) // 2
            if arr[mid] <= target:
                l = mid + 1
            else:
                r = mid
        return l
