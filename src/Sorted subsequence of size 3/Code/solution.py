class Solution:
    def find3Numbers(self, arr):
        n = len(arr)
        
        # If size is less than 3
        if n < 3:
            return []
        
        # rightMax[i] stores maximum value from i to end
        rightMax = [0] * n
        rightMax[n - 1] = arr[n - 1]
        
        # Fill rightMax from right to left
        for i in range(n - 2, -1, -1):
            rightMax[i] = max(arr[i], rightMax[i + 1])
        
        # Smallest value seen so far from left
        leftMin = arr[0]
        
        # Check every element as middle element
        for i in range(1, n - 1):
            
            # Valid subsequence found
            if leftMin < arr[i] < rightMax[i + 1]:
                return [leftMin, arr[i], rightMax[i + 1]]
            
            # Update left minimum
            leftMin = min(leftMin, arr[i])
        
        return []