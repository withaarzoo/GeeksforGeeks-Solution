class Solution:
    def minCutCost(self, n, cuts):
        # Add endpoints and sort
        cuts = cuts[:]  # copy to avoid mutating input
        cuts.append(0)
        cuts.append(n)
        cuts.sort()
        m = len(cuts)
        # dp[i][j] = min cost to cut between cuts[i] and cuts[j] (exclusive)
        dp = [[0] * m for _ in range(m)]
        # iterate over interval sizes (j - i)
        for length in range(2, m):  # minimum interval with a possible cut has length 2
            for i in range(0, m - length):
                j = i + length
                best = float('inf')
                # try each possible first cut k between i and j
                for k in range(i + 1, j):
                    cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j]
                    if cost < best:
                        best = cost
                dp[i][j] = 0 if best == float('inf') else best
        return dp[0][m-1]
