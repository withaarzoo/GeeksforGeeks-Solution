class Solution:
    def findTwoElement(self, arr):
        n = len(arr)
        
        # actual sum and sum of squares
        S = 0          # sum of elements
        Sq = 0         # sum of squares
        for x in arr:
            S += x
            Sq += x * x
        
        # expected sum and sum of squares for 1..n
        N = n
        S_exp = N * (N + 1) // 2
        Sq_exp = N * (N + 1) * (2 * N + 1) // 6
        
        diff = S - S_exp          # R - M
        diffSq = Sq - Sq_exp      # R^2 - M^2
        
        sumRM = diffSq // diff    # R + M
        
        R = (diff + sumRM) // 2   # repeating
        M = R - diff              # missing
        
        return [R, M]             # [repeating, missing]
