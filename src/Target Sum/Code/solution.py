class Solution:
    def totalWays(self, arr, target):
        totalSum = sum(arr)

        # If target cannot be achieved
        if abs(target) > totalSum:
            return 0

        # totalSum + target must be even
        if (totalSum + target) % 2 != 0:
            return 0

        required = (totalSum + target) // 2

        dp = [0] * (required + 1)
        dp[0] = 1

        for num in arr:
            for s in range(required, num - 1, -1):
                dp[s] += dp[s - num]

        return dp[required]