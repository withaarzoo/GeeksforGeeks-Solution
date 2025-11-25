class Solution:
    def subarrayXor(self, arr):
        n = len(arr)
        
        # If length is even, result is 0
        if n % 2 == 0:
            return 0
        
        ans = 0
        # For odd n, only even indices contribute
        for i in range(0, n, 2):
            ans ^= arr[i]
        return ans
