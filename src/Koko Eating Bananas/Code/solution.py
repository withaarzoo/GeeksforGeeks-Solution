class Solution:
    def kokoEat(self, arr, k):
        low = 1
        high = max(arr)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            hours = 0

            for bananas in arr:
                hours += (bananas + mid - 1) // mid  # ceil division

            if hours <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
