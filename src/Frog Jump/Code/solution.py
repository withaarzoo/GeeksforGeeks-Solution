class Solution:
    def minCost(self, height):
        n = len(height)
        if n <= 1:
            return 0
        prev2 = 0  # dp[i-2]
        prev1 = abs(height[1] - height[0])  # dp[i-1]
        if n == 2:
            return prev1

        for i in range(2, n):
            jump1 = prev1 + abs(height[i] - height[i - 1])  # from i-1
            jump2 = prev2 + abs(height[i] - height[i - 2])  # from i-2
            curr = min(jump1, jump2)
            prev2, prev1 = prev1, curr  # slide window
        return prev1
