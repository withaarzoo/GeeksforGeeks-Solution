class Solution:
    def countPartitions(self, arr, diff):
        totalSum = sum(arr)
        
        # If totalSum + diff is odd, partition is impossible
        if (totalSum + diff) % 2 != 0:
            return 0
        
        target = (totalSum + diff) // 2
        
        # dp[j] = number of ways to make sum j
        dp = [0] * (target + 1)
        
        # One way to make sum 0
        dp[0] = 1
        
        for num in arr:
            # Traverse backwards
            for j in range(target, num - 1, -1):
                dp[j] += dp[j - num]
        
        return dp[target]