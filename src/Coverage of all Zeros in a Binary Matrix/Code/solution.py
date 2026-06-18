class Solution:
    def findCoverage(self, mat):
        # Get matrix dimensions so I can scan every cell.
        n = len(mat)
        m = len(mat[0])

        # colTotal[j] stores the total number of 1s in column j.
        colTotal = [0] * m

        # First pass: count all 1s in every column.
        for i in range(n):
            for j in range(m):
                colTotal[j] += mat[i][j]

        # colPrefix[j] stores the number of 1s seen above the current row in column j.
        colPrefix = [0] * m

        ans = 0

        # Second pass: compute coverage for every zero cell.
        for i in range(n):
            # rowTotal stores the total number of 1s in the current row.
            rowTotal = sum(mat[i])

            # leftOnes stores the number of 1s already seen on the left side of the row.
            leftOnes = 0

            for j in range(m):
                if mat[i][j] == 0:
                    coverage = 0

                    # Left direction is covered if there is at least one 1 before this cell.
                    if leftOnes > 0:
                        coverage += 1

                    # Right direction is covered if there is at least one 1 after this cell.
                    if rowTotal - leftOnes > 0:
                        coverage += 1

                    # Up direction is covered if there is at least one 1 above this cell.
                    if colPrefix[j] > 0:
                        coverage += 1

                    # Down direction is covered if there is at least one 1 below this cell.
                    if colTotal[j] - colPrefix[j] > 0:
                        coverage += 1

                    ans += coverage
                else:
                    # Current cell is 1, so it can help zero cells to the right.
                    leftOnes += 1

            # Update column prefixes only after the whole row is done.
            # This keeps the current row out of the "up" check.
            for j in range(m):
                if mat[i][j] == 1:
                    colPrefix[j] += 1

        return ans