class Solution:
    def graycode(self, n):
        result = []
        
        # Total number of Gray Codes = 2^n
        total = 1 << n
        
        # Generate Gray Code for every number
        for i in range(total):
            
            # Gray Code formula
            gray = i ^ (i >> 1)
            
            binary = ""
            
            # Convert gray number into binary string of length n
            for bit in range(n - 1, -1, -1):
                if gray & (1 << bit):
                    binary += '1'
                else:
                    binary += '0'
            
            result.append(binary)
        
        return result