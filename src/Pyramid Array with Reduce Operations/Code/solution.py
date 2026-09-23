class Solution:
    def formPyramid(self, arr):
        n = len(arr)
        total = sum(arr)
        if n <= 2:
            return total - 1
        left = [0] * n
        right = [0] * n
        left[0] = 1
        for i in range(1, n):
            left[i] = min(left[i - 1] + 1, arr[i])
        right[n - 1] = 1
        for i in range(n - 2, -1, -1):
            right[i] = min(right[i + 1] + 1, arr[i])
        maxX = 0
        for i in range(n):
            maxX = max(maxX, min(left[i], right[i]))
        return total - maxX * maxX