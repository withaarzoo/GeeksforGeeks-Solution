class Solution:
    def zigzagSequence(self, mat):
        n = len(mat)

        dp = mat[0][:]

        for i in range(1, n):
            max1 = -1
            max2 = -1
            max1_col = -1

            for j in range(n):
                if dp[j] > max1:
                    max2 = max1
                    max1 = dp[j]
                    max1_col = j
                elif dp[j] > max2:
                    max2 = dp[j]

            next_dp = [0] * n

            for j in range(n):
                if j != max1_col:
                    best_previous = max1
                else:
                    best_previous = max2

                next_dp[j] = mat[i][j] + best_previous

            dp = next_dp

        return max(dp)