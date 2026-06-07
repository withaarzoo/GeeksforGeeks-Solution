class Solution:
    def profession(self, level, pos):
        
        # Convert position to zero-based indexing
        x = pos - 1

        # Count set bits
        cnt = 0
        while x:
            cnt += (x & 1)  # Add 1 if current bit is set
            x >>= 1         # Move to next bit

        # Even flips => Engineer, Odd flips => Doctor
        return "Engineer" if cnt % 2 == 0 else "Doctor"