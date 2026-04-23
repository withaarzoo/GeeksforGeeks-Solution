class Solution:
    def canSplit(self, arr):
        # Step 1: Total sum
        total = sum(arr)
        
        # Step 2: If odd
        if total % 2 != 0:
            return False
        
        target = total // 2
        curr = 0
        
        # Step 3: Traverse
        for num in arr:
            curr += num
            
            if curr == target:
                return True
        
        return False