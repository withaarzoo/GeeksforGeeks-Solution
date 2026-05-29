class Solution:
    def validGroups(self, s):
        n = len(s)

        # dp[index][prevSum]
        dp = [[-1] * 901 for _ in range(n)]

        def solve(idx, prev_sum):

            # Reached end -> one valid grouping
            if idx == n:
                return 1

            # Memoized answer
            if dp[idx][prev_sum] != -1:
                return dp[idx][prev_sum]

            ans = 0
            curr_sum = 0

            # Try every possible ending position
            for end in range(idx, n):

                # Update current group sum
                curr_sum += int(s[end])

                # Non-decreasing condition
                if curr_sum >= prev_sum:
                    ans += solve(end + 1, curr_sum)

            dp[idx][prev_sum] = ans
            return ans

        return solve(0, 0)