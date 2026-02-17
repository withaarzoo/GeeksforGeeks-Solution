class Solution:
    def overlapInt(self, arr):
        
        # Step 1: Find maximum end
        max_end = 0
        for start, end in arr:
            max_end = max(max_end, end)
        
        # Step 2: Difference array
        diff = [0] * (max_end + 2)
        
        # Step 3: Mark intervals
        for start, end in arr:
            diff[start] += 1
            diff[end + 1] -= 1
        
        current = 0
        max_overlap = 0
        
        # Step 4: Prefix sum
        for i in range(max_end + 1):
            current += diff[i]
            max_overlap = max(max_overlap, current)
        
        return max_overlap
