class Solution:
    def subsetXORSum(self, arr):
        n = len(arr)
        
        # Step 1: OR of all elements
        all_or = 0
        for x in arr:
            all_or |= x   # add all bits that appear in the array
        
        # Step 2: each present bit contributes in exactly 2^(n-1) subsets
        multiplier = 1 << (n - 1)
        ans = all_or * multiplier
        
        return ans
