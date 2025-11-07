from bisect import bisect_right

class Solution: 
    def maxProfit(self, jobs):
        n = len(jobs)
        # Sort by end time
        jobs.sort(key=lambda x: x[1])
        ends = [j[1] for j in jobs]

        dp = [0] * n
        for i in range(n):
            take = jobs[i][2]
            # rightmost j with ends[j] <= jobs[i][0]
            j = bisect_right(ends, jobs[i][0], 0, i) - 1
            if j >= 0:
                take += dp[j]
            skip = dp[i-1] if i > 0 else 0
            dp[i] = max(skip, take)
        return dp[-1]
