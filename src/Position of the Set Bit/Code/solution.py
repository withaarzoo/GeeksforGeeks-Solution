class Solution:
    def findPosition(self, n):
        # If n is 0, it has no set bits
        if n == 0:
            return -1
        
        # Check if n has exactly one set bit
        # If not, return -1
        if (n & (n - 1)) != 0:
            return -1
        
        position = 1  # Start counting from LSB
        
        # Traverse bits
        while n > 0:
            # If current bit is 1, return position
            if n & 1:
                return position
            
            # Shift right to check next bit
            n = n >> 1
            
            position += 1  # Move to next position
        
        return -1