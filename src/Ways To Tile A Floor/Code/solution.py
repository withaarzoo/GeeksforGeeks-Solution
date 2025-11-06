class Solution:
    def numberOfWays(self, n):
        # Base cases
        if n <= 2:
            return n  # 1 -> 1, 2 -> 2
        
        prev2, prev1 = 1, 2  # dp[1], dp[2]
        
        # Iteratively compute dp[i] = dp[i-1] + dp[i-2]
        for _ in range(3, n + 1):
            cur = prev1 + prev2
            prev2, prev1 = prev1, cur  # slide the window
        
        return prev1  # dp[n]
