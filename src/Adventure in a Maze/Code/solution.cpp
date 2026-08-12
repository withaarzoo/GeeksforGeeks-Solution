class Solution
{
public:
    vector<int> findWays(vector<vector<int>> &grid)
    {
        int n = grid.size();                // Store the size of the n x n grid.
        const long long MOD = 1000000007LL; // Required modulo for the path count.

        // ways[j] stores the number of ways to reach column j.
        // Before processing a cell, it represents the top cell's value.
        vector<long long> ways(n, 0);

        // best[j] stores the maximum Adventure to reach column j.
        // -1 means that the cell is currently unreachable.
        vector<int> best(n, -1);

        // The entry cell is always the starting point.
        ways[0] = 1;

        // The Adventure starts with the value of the entry cell.
        best[0] = grid[0][0];

        // Process the grid row by row.
        for (int i = 0; i < n; ++i)
        {

            // Process every column from left to right.
            for (int j = 0; j < n; ++j)
            {

                // The starting cell has already been initialized.
                if (i == 0 && j == 0)
                {
                    continue;
                }

                // These variables store the new DP state for (i, j).
                long long currentWays = 0;
                int currentBest = -1;

                // Check whether we can enter (i, j) from the left.
                if (j > 0 &&
                    (grid[i][j - 1] == 1 || grid[i][j - 1] == 3) &&
                    best[j - 1] != -1)
                {

                    // Every path reaching the left cell can continue here.
                    currentWays = (currentWays + ways[j - 1]) % MOD;

                    // Add the current cell's value to the best left path.
                    currentBest = max(
                        currentBest,
                        best[j - 1] + grid[i][j]);
                }

                // Check whether we can enter (i, j) from the top.
                // ways[j] and best[j] still contain the previous row's values.
                if (i > 0 &&
                    (grid[i - 1][j] == 2 || grid[i - 1][j] == 3) &&
                    best[j] != -1)
                {

                    // Every path reaching the top cell can continue here.
                    currentWays = (currentWays + ways[j]) % MOD;

                    // Add the current cell's value to the best top path.
                    currentBest = max(
                        currentBest,
                        best[j] + grid[i][j]);
                }

                // Replace the old top state with the current cell's state.
                ways[j] = currentWays;
                best[j] = currentBest;
            }
        }

        // If the exit cannot be reached, both required answers are zero.
        if (best[n - 1] == -1)
        {
            return {0, 0};
        }

        // Return total valid paths and maximum Adventure.
        return {
            (int)ways[n - 1],
            best[n - 1]};
    }
};