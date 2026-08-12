class Solution:
    def findWays(self, grid):
        n = len(grid)  # Store the size of the n x n grid.
        MOD = 10**9 + 7  # Required modulo for the path count.

        # ways[j] stores the number of ways to reach column j.
        # Before updating a cell, it represents the top cell.
        ways = [0] * n

        # best[j] stores the maximum Adventure for column j.
        # -1 means that the cell is unreachable.
        best = [-1] * n

        # There is exactly one way to start at the entry cell.
        ways[0] = 1

        # Include the entry cell in the initial Adventure.
        best[0] = grid[0][0]

        # Process rows from top to bottom.
        for i in range(n):

            # Process columns from left to right.
            for j in range(n):

                # The starting cell has already been initialized.
                if i == 0 and j == 0:
                    continue

                # Store the newly calculated state for this cell.
                current_ways = 0
                current_best = -1

                # Check whether the current cell can be reached from the left.
                if (
                    j > 0
                    and grid[i][j - 1] in (1, 3)
                    and best[j - 1] != -1
                ):
                    # Add all paths that reach the left cell.
                    current_ways = (
                        current_ways + ways[j - 1]
                    ) % MOD

                    # Update the maximum Adventure through the left cell.
                    current_best = max(
                        current_best,
                        best[j - 1] + grid[i][j]
                    )

                # Check whether the current cell can be reached from the top.
                # best[j] still represents the previous row here.
                if (
                    i > 0
                    and grid[i - 1][j] in (2, 3)
                    and best[j] != -1
                ):
                    # Add all paths that reach the top cell.
                    current_ways = (
                        current_ways + ways[j]
                    ) % MOD

                    # Update the maximum Adventure through the top cell.
                    current_best = max(
                        current_best,
                        best[j] + grid[i][j]
                    )

                # Store the newly calculated state.
                ways[j] = current_ways
                best[j] = current_best

        # If the exit is unreachable, the answer is [0, 0].
        if best[n - 1] == -1:
            return [0, 0]

        # Return the total paths and maximum Adventure.
        return [ways[n - 1], best[n - 1]]