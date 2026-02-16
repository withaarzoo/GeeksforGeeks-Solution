class Solution:
    def canAttend(self, arr):
        n = len(arr)
        
        # Step 1: Sort by starting time
        arr.sort(key=lambda x: x[0])
        
        # Step 2: Check for overlapping
        for i in range(1, n):
            if arr[i][0] < arr[i - 1][1]:
                return False
        
        return True
