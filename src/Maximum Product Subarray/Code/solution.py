class Solution:
    def maxProduct(self, arr):
        maxEnding = arr[0]
        minEnding = arr[0]
        result = arr[0]
        
        for i in range(1, len(arr)):
            if arr[i] < 0:
                maxEnding, minEnding = minEnding, maxEnding
            
            maxEnding = max(arr[i], maxEnding * arr[i])
            minEnding = min(arr[i], minEnding * arr[i])
            
            result = max(result, maxEnding)
        
        return result
