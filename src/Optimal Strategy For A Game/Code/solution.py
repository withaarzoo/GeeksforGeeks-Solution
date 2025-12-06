class Solution:
    def maximumAmount(self, arr):
        n = len(arr)
        # dp[i][j] -> max amount current player can collect from arr[i..j]
        dp = [[0] * n for _ in range(n)]
        
        for gap in range(n):
            for i in range(n - gap):
                j = i + gap
                
                if i == j:
                    # Only one coin
                    dp[i][j] = arr[i]
                elif j == i + 1:
                    # Two coins
                    dp[i][j] = max(arr[i], arr[j])
                else:
                    x = dp[i + 2][j] if i + 2 <= j else 0
                    y = dp[i + 1][j - 1] if i + 1 <= j - 1 else 0
                    z = dp[i][j - 2] if i <= j - 2 else 0
                    
                    pick_left = arr[i] + min(x, y)
                    pick_right = arr[j] + min(y, z)
                    
                    dp[i][j] = max(pick_left, pick_right)
        
        return dp[0][n - 1]
