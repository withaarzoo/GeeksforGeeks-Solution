from bisect import bisect_left, bisect_right
from collections import defaultdict

class Solution:
    def freqInRange(self, arr, queries):
        
        # Store occurrence positions of every value
        pos = defaultdict(list)
        
        for i, val in enumerate(arr):
            pos[val].append(i)
        
        ans = []
        
        for l, r, x in queries:
            
            # If x never appeared
            if x not in pos:
                ans.append(0)
                continue
            
            positions = pos[x]
            
            # First occurrence >= l
            left = bisect_left(positions, l)
            
            # First occurrence > r
            right = bisect_right(positions, r)
            
            ans.append(right - left)
        
        return ans