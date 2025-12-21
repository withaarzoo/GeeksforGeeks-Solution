class Solution:
    def firstOccurrence(self, arr, l, r, x):
        ans = -1
        while l <= r:
            mid = l + (r - l) // 2
            if arr[mid] == x:
                ans = mid
                r = mid - 1
            elif arr[mid] < x:
                l = mid + 1
            else:
                r = mid - 1
        return ans

    def lastOccurrence(self, arr, l, r, x):
        ans = -1
        while l <= r:
            mid = l + (r - l) // 2
            if arr[mid] == x:
                ans = mid
                l = mid + 1
            elif arr[mid] < x:
                l = mid + 1
            else:
                r = mid - 1
        return ans

    def countXInRange(self, arr, queries):
        result = []

        for l, r, x in queries:
            first = self.firstOccurrence(arr, l, r, x)
            if first == -1:
                result.append(0)
                continue

            last = self.lastOccurrence(arr, l, r, x)
            result.append(last - first + 1)

        return result
