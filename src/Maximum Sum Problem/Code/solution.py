class Solution:
    
    def __init__(self):
        
        # Dictionary for memoization
        self.dp = {}

    def solve(self, n):

        # Base case
        if n <= 1:
            return n

        # Return stored answer if already calculated
        if n in self.dp:
            return self.dp[n]

        # Recursive calculation of three parts
        broken = (
            self.solve(n // 2) +
            self.solve(n // 3) +
            self.solve(n // 4)
        )

        # Store maximum value
        self.dp[n] = max(n, broken)

        return self.dp[n]

    def maxSum(self, n):
        
        # Start recursion
        return self.solve(n)