class Solution:
    def noOfWays(self, m, n, x):
        
        # dp[j] = number of ways to make sum j
        dp = [0] * (x + 1)
        dp[0] = 1
        
        for dice in range(1, n + 1):
            
            temp = [0] * (x + 1)
            
            for sum_val in range(1, x + 1):
                
                for face in range(1, m + 1):
                    
                    if sum_val - face >= 0:
                        temp[sum_val] += dp[sum_val - face]
            
            dp = temp
        
        return dp[x]