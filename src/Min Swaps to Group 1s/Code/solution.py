class Solution:
    def minSwaps(self, arr):
        n = len(arr)
        
        # Count total 1s
        k = arr.count(1)
        
        if k == 0:
            return -1
        
        # First window
        ones = sum(arr[:k])
        max_ones = ones
        
        # Sliding window
        for i in range(k, n):
            if arr[i] == 1:
                ones += 1
            if arr[i - k] == 1:
                ones -= 1
            
            max_ones = max(max_ones, ones)
        
        return k - max_ones