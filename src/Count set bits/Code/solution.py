class Solution:
    def countSetBits(self, n):
        total = 0  # total number of set bits
        
        i = 0
        # loop over bit positions while (1 << i) <= n
        while (1 << i) <= n:
            bit_mask = 1 << i          # 2^i
            cycle_len = bit_mask << 1  # 2^(i+1)
            
            full_cycles = n // cycle_len
            
            # each full cycle contributes bit_mask ones at bit i
            total += full_cycles * bit_mask
            
            remainder = n % cycle_len
            
            extra_ones = remainder - bit_mask + 1
            if extra_ones > 0:
                total += extra_ones
            
            i += 1
        
        return total
