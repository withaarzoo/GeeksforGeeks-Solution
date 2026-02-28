class Solution:
    def findClosestPair(arr1, arr2, x):
        n = len(arr1)
        m = len(arr2)
        
        i = 0
        j = m - 1
        
        minDiff = float('inf')
        bestA = 0
        bestB = 0
        
        while i < n and j >= 0:
            curr_sum = arr1[i] + arr2[j]
            diff = abs(curr_sum - x)
            
            if diff < minDiff:
                minDiff = diff
                bestA = arr1[i]
                bestB = arr2[j]
            
            if curr_sum > x:
                j -= 1
            else:
                i += 1
        
        return [bestA, bestB]