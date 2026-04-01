class Solution:
    def countStrings(self, n):
        # Strings of length 1:
        # "0" -> ends with 0
        # "1" -> ends with 1
        endWith0 = 1
        endWith1 = 1
        
        # Build answer for lengths from 2 to n
        for i in range(2, n + 1):
            newEndWith0 = endWith0 + endWith1
            newEndWith1 = endWith0
            
            endWith0 = newEndWith0
            endWith1 = newEndWith1
        
        return endWith0 + endWith1