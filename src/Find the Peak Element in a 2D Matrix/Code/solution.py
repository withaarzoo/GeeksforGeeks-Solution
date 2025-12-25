class Solution:
    def findPeakGrid(self, mat):
        n = len(mat)
        m = len(mat[0])

        for i in range(n):
            for j in range(m):
                curr = mat[i][j]

                up = mat[i - 1][j] if i > 0 else float('-inf')
                down = mat[i + 1][j] if i < n - 1 else float('-inf')
                left = mat[i][j - 1] if j > 0 else float('-inf')
                right = mat[i][j + 1] if j < m - 1 else float('-inf')

                if curr >= up and curr >= down and \
                   curr >= left and curr >= right:
                    return [i, j]

        return [-1, -1]
