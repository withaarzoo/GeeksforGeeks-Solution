class Solution:
    def prefixSum2D(self, mat, queries):

        n = len(mat)
        m = len(mat[0])

        # Create prefix sum matrix
        prefix = [[0] * m for _ in range(n)]

        # Build prefix matrix
        for i in range(n):
            for j in range(m):
                prefix[i][j] = mat[i][j]

                if i > 0:
                    prefix[i][j] += prefix[i - 1][j]
                if j > 0:
                    prefix[i][j] += prefix[i][j - 1]
                if i > 0 and j > 0:
                    prefix[i][j] -= prefix[i - 1][j - 1]

        result = []

        # Process queries
        for r1, c1, r2, c2 in queries:
            total = prefix[r2][c2]

            if r1 > 0:
                total -= prefix[r1 - 1][c2]
            if c1 > 0:
                total -= prefix[r2][c1 - 1]
            if r1 > 0 and c1 > 0:
                total += prefix[r1 - 1][c1 - 1]

            result.append(total)

        return result
