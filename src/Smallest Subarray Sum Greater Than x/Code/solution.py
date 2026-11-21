class Solution:
    def smallestSubWithSum(self, arr, x):
        n = len(arr)
        left = 0
        sum = 0
        minLen = n + 1
        for right in range(n):
            sum += arr[right]
            while sum > x and left <= right:
                minLen = min(minLen, right - left + 1)
                sum -= arr[left]
                left += 1
        return 0 if minLen == n + 1 else minLen