class Solution:
    def subarrayXor(self, arr):
        n = len(arr)
        if n % 2 == 0:
            return 0
        ans = 0
        for i in range(0, n, 2):
            ans ^= arr[i]
        return ans