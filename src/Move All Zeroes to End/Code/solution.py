class Solution:
    def pushZerosToEnd(self, arr):
        n = len(arr)
        index = 0  # position to place next non-zero element
        
        # First pass: Move all non-zero elements forward
        for i in range(n):
            if arr[i] != 0:
                arr[index] = arr[i]
                index += 1
        
        # Second pass: Fill remaining positions with 0
        while index < n:
            arr[index] = 0
            index += 1