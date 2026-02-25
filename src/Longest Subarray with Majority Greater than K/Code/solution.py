class Solution:
    def longestSubarray(self, arr, k):
        
        prefix_sum = 0
        max_len = 0
        mp = {}   # prefix_sum -> first index
        
        for i in range(len(arr)):
            
            # Convert to +1 or -1
            if arr[i] > k:
                prefix_sum += 1
            else:
                prefix_sum -= 1
            
            if prefix_sum > 0:
                max_len = i + 1
            else:
                if prefix_sum not in mp:
                    mp[prefix_sum] = i
                
                if (prefix_sum - 1) in mp:
                    max_len = max(max_len, i - mp[prefix_sum - 1])
        
        return max_len