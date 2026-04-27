class Solution:
    def smallestSubstring(self, s):
        n = len(s)
        count = [0, 0, 0]
        
        left = 0
        ans = float('inf')
        
        for right in range(n):
            count[ord(s[right]) - ord('0')] += 1
            
            while count[0] > 0 and count[1] > 0 and count[2] > 0:
                ans = min(ans, right - left + 1)
                
                count[ord(s[left]) - ord('0')] -= 1
                left += 1
        
        return -1 if ans == float('inf') else ans