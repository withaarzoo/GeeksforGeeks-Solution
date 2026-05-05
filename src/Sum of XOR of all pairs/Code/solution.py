class Solution:
    def sumXOR(self, arr):
        n = len(arr)  # total elements
        result = 0  # final answer
        
        # Iterate through all 32 bits
        for bit in range(32):
            count1 = 0  # numbers with this bit set
            
            # Count set bits
            for num in arr:
                if num & (1 << bit):
                    count1 += 1
            
            count0 = n - count1  # numbers with bit = 0
            
            # Add contribution of this bit
            result += count1 * count0 * (1 << bit)
        
        return result