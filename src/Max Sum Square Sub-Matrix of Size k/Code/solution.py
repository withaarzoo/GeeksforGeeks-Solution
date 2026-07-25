class Solution:
    def maximumSum(self, mat, k):

        n = len(mat)

        # Prefix sum matrix
        prefix = [[0] * n for _ in range(n)]

        # Build the prefix sum matrix
        for i in range(n):
            for j in range(n):

                # Current cell value
                prefix[i][j] = mat[i][j]

                # Add value from top
                if i > 0:
                    prefix[i][j] += prefix[i - 1][j]

                # Add value from left
                if j > 0:
                    prefix[i][j] += prefix[i][j - 1]

                # Remove overlapping area
                if i > 0 and j > 0:
                    prefix[i][j] -= prefix[i - 1][j - 1]

        # Store the maximum answer
        ans = float("-inf")

        # Check every possible k x k square
        for i in range(k - 1, n):
            for j in range(k - 1, n):

                # Top-left corner
                r = i - k + 1
                c = j - k + 1

                # Current square sum
                total = prefix[i][j]

                # Remove upper area
                if r > 0:
                    total -= prefix[r - 1][j]

                # Remove left area
                if c > 0:
                    total -= prefix[i][c - 1]

                # Add overlapping area
                if r > 0 and c > 0:
                    total += prefix[r - 1][c - 1]

                # Update answer
                ans = max(ans, total)

        return ans