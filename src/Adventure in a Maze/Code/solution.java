class Solution {
    public ArrayList<Integer> findWays(int[][] grid) {
        int n = grid.length; // Store the size of the n x n grid.
        final long MOD = 1000000007L; // Required modulo for the path count.

        // ways[j] stores the number of ways to reach column j.
        // Before processing a cell, it represents the top cell's value.
        long[] ways = new long[n];

        // best[j] stores the maximum Adventure to reach column j.
        // -1 means that the cell is currently unreachable.
        int[] best = new int[n];

        // Initially, every cell is considered unreachable.
        Arrays.fill(best, -1);

        // The entry cell is the only starting position.
        ways[0] = 1;

        // The starting Adventure includes the entry cell's value.
        best[0] = grid[0][0];

        // Process the grid row by row.
        for (int i = 0; i < n; i++) {

            // Process every column from left to right.
            for (int j = 0; j < n; j++) {

                // The starting cell has already been initialized.
                if (i == 0 && j == 0) {
                    continue;
                }

                // Store the new state for the current cell.
                long currentWays = 0;
                int currentBest = -1;

                // Check whether the current cell can be reached from the left.
                if (j > 0 &&
                        (grid[i][j - 1] == 1 || grid[i][j - 1] == 3) &&
                        best[j - 1] != -1) {

                    // Add all paths coming from the left.
                    currentWays = (currentWays + ways[j - 1]) % MOD;

                    // Update the best Adventure using the left cell.
                    currentBest = Math.max(
                            currentBest,
                            best[j - 1] + grid[i][j]);
                }

                // Check whether the current cell can be reached from the top.
                // best[j] still represents the previous row at this point.
                if (i > 0 &&
                        (grid[i - 1][j] == 2 || grid[i - 1][j] == 3) &&
                        best[j] != -1) {

                    // Add all paths coming from the top.
                    currentWays = (currentWays + ways[j]) % MOD;

                    // Update the best Adventure using the top cell.
                    currentBest = Math.max(
                            currentBest,
                            best[j] + grid[i][j]);
                }

                // Store the newly calculated state for this cell.
                ways[j] = currentWays;
                best[j] = currentBest;
            }
        }

        // If the exit is unreachable, the required answer is [0, 0].
        if (best[n - 1] == -1) {
            ArrayList<Integer> answer = new ArrayList<>();
            answer.add(0);
            answer.add(0);
            return answer;
        }

        // Create the result in the required format.
        ArrayList<Integer> answer = new ArrayList<>();

        // Add the total number of valid paths.
        answer.add((int) ways[n - 1]);

        // Add the maximum Adventure.
        answer.add(best[n - 1]);

        // Return [totalPaths, maxAdventure].
        return answer;
    }
}