#User function Template for python3

class Solution:
    def isPallindrome(self, N):
        left = 63  # assume 64-bit
        
        # Find MSB (first 1 from left)
        while left >= 0 and ((N >> left) & 1) == 0:
            left -= 1
        
        right = 0
        
        # Compare bits from both ends
        while left > right:
            left_bit = (N >> left) & 1
            right_bit = (N >> right) & 1
            
            if left_bit != right_bit:
                return 0
            
            left -= 1
            right += 1
        
        return 1