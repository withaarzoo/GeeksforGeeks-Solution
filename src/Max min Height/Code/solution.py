class Solution():
    def canMake(self, arr, n, k, w, target):
        diff = [0] * (n + 1)
        currAdd = 0
        operations = 0

        for i in range(n):
            currAdd += diff[i]
            currentHeight = arr[i] + currAdd

            if currentHeight < target:
                need = target - currentHeight
                operations += need
                if operations > k:
                    return False

                currAdd += need
                if i + w < n:
                    diff[i + w] -= need
        return True

    def maxMinHeight(self, arr, k, w):
        n = len(arr)
        minVal = min(arr)

        low = minVal
        high = minVal + k
        ans = minVal

        while low <= high:
            mid = (low + high) // 2

            if self.canMake(arr, n, k, w, mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans
