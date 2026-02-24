class Solution:
    def equalSumSpan(self, a1, a2):
        n = len(a1)
        
        prefix_sum = 0
        max_len = 0
        mp = {}  # prefix_sum -> first index
        
        for i in range(n):
            prefix_sum += (a1[i] - a2[i])
            
            if prefix_sum == 0:
                max_len = i + 1
            
            if prefix_sum in mp:
                max_len = max(max_len, i - mp[prefix_sum])
            else:
                mp[prefix_sum] = i
        
        return max_len