class Solution:
    def checkElements(self, start, end, arr):
        
        # Convert array into a set for fast lookup
        st = set(arr)
        
        # Check every number in the range
        for i in range(start, end + 1):
            
            # If any number is missing
            if i not in st:
                return False
        
        # All numbers are present
        return True