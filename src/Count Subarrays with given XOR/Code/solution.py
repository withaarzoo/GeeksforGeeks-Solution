class Solution:
    def subarrayXor(self, arr, k):
        
        from collections import defaultdict
        
        freq = defaultdict(int)
        count = 0
        prefixXor = 0
        
        # Initial case
        freq[0] = 1
        
        for num in arr:
            
            prefixXor ^= num
            
            if (prefixXor ^ k) in freq:
                count += freq[prefixXor ^ k]
            
            freq[prefixXor] += 1
        
        return count