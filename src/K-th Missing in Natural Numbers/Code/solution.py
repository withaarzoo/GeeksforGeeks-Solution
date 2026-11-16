class Solution:
    def findKthSmall(self, arr, k):
        arr.sort()
        prev = 0
        for num in arr:
            missing = num - prev - 1
            if k <= missing:
                return prev + k
            k -= missing
            prev = num
        return prev + k