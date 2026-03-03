class Solution:
    def totalElements(self, arr):
        freq = {}
        left = 0
        maxLen = 0
        
        for right in range(len(arr)):
            # Add current element
            freq[arr[right]] = freq.get(arr[right], 0) + 1
            
            # Shrink window if more than 2 distinct
            while len(freq) > 2:
                freq[arr[left]] -= 1
                
                if freq[arr[left]] == 0:
                    del freq[arr[left]]
                
                left += 1
            
            maxLen = max(maxLen, right - left + 1)
        
        return maxLen