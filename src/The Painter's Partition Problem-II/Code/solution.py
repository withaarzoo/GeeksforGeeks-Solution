class Solution:
    
    def isPossible(self, arr, k, maxTime):
        currentSum = 0
        painters = 1
        
        for length in arr:
            
            if length > maxTime:
                return False
            
            if currentSum + length <= maxTime:
                currentSum += length
            else:
                painters += 1
                currentSum = length
        
        return painters <= k
    
    def minTime(self, arr, k):
        
        low = max(arr)
        high = sum(arr)
        
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            
            if self.isPossible(arr, k, mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        
        return ans
