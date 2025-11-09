class Solution: 
    def chocolatePickup(self, mat): 
        n = len(mat)
        NEG = -10**9  # sentinel for impossible
        
        if mat[0][0] == -1 or mat[n-1][n-1] == -1:
            return 0
        
        # dp[c1][c2] for current k; rows are derived as r = k - c
        dp = [[NEG]*n for _ in range(n)]
        dp[0][0] = mat[0][0]  # k = 0
        
        for k in range(1, 2*(n-1) + 1):
            ndp = [[NEG]*n for _ in range(n)]
            for c1 in range(n):
                r1 = k - c1
                if r1 < 0 or r1 >= n:
                    continue
                if mat[r1][c1] == -1:
                    continue
                
                for c2 in range(n):
                    r2 = k - c2
                    if r2 < 0 or r2 >= n:
                        continue
                    if mat[r2][c2] == -1:
                        continue
                    
                    best = NEG
                    # both from down
                    if r1-1 >= 0 and r2-1 >= 0:
                        best = max(best, dp[c1][c2])
                    # first from right, second from down
                    if c1-1 >= 0 and r2-1 >= 0:
                        best = max(best, dp[c1-1][c2])
                    # first from down, second from right
                    if r1-1 >= 0 and c2-1 >= 0:
                        best = max(best, dp[c1][c2-1])
                    # both from right
                    if c1-1 >= 0 and c2-1 >= 0:
                        best = max(best, dp[c1-1][c2-1])
                    
                    if best == NEG:
                        continue
                    
                    gain = mat[r1][c1]
                    if c1 != c2:  # avoid double count when on same cell
                        gain += mat[r2][c2]
                    ndp[c1][c2] = max(ndp[c1][c2], best + gain)
            dp = ndp
        
        ans = dp[n-1][n-1]
        return 0 if ans < 0 else ans
