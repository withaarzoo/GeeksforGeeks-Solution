class Solution:
    def mergeStones(self, stones, k):
        n = len(stones)
        # impossible to merge to one pile
        if (n - 1) % (k - 1) != 0:
            return -1

        # prefix sums for O(1) interval sums
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + stones[i]

        def range_sum(i, j):
            return pref[j + 1] - pref[i]

        INF = 10**15
        dp = [[0] * n for _ in range(n)]

        # len is interval length
        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                dp[i][j] = INF
                # split with step k-1 to ensure valid intermediate piles
                m = i
                while m < j:
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])
                    m += (k - 1)
                # if we can merge this interval into 1 pile, add sum
                if (length - 1) % (k - 1) == 0:
                    dp[i][j] += range_sum(i, j)
        return dp[0][n - 1]
