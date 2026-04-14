class Solution:
    def removeSpaces(self, s):
        # List to store non-space characters
        result = []
        
        # Traverse each character in the string
        for ch in s:
            
            # Add character if it is not a space
            if ch != ' ':
                result.append(ch)
        
        # Join list into final string
        return ''.join(result)