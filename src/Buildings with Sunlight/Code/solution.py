class Solution:
    def visibleBuildings(self, arr):
        n = len(arr)
        
        count = 1                  # First building always visible
        maxHeight = arr[0]
        
        for i in range(1, n):
            if arr[i] >= maxHeight:
                count += 1
                maxHeight = arr[i]
        
        return count