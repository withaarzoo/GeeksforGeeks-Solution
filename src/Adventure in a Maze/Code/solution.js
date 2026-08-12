/**
 * @param {number[][]} grid
 * @return {number[]}
 */

class Solution {
  findWays(grid) {
    const n = grid.length; // Store the size of the n x n grid.
    const MOD = 1000000007; // Required modulo for the path count.

    // ways[j] stores the number of ways to reach column j.
    // It represents the top cell until the current cell is processed.
    const ways = new Array(n).fill(0);

    // best[j] stores the maximum Adventure for column j.
    // -1 means that the cell is unreachable.
    const best = new Array(n).fill(-1);

    // There is exactly one way to start at the entry cell.
    ways[0] = 1;

    // Include the entry cell in the Adventure.
    best[0] = grid[0][0];

    // Process rows from top to bottom.
    for (let i = 0; i < n; i++) {
      // Process columns from left to right.
      for (let j = 0; j < n; j++) {
        // The starting cell has already been initialized.
        if (i === 0 && j === 0) {
          continue;
        }

        // Store the new state for the current cell.
        let currentWays = 0;
        let currentBest = -1;

        // Check whether we can move into this cell from the left.
        if (
          j > 0 &&
          (grid[i][j - 1] === 1 || grid[i][j - 1] === 3) &&
          best[j - 1] !== -1
        ) {
          // Add all paths reaching the left cell.
          currentWays = (currentWays + ways[j - 1]) % MOD;

          // Update the maximum Adventure through the left cell.
          currentBest = Math.max(currentBest, best[j - 1] + grid[i][j]);
        }

        // Check whether we can move into this cell from the top.
        // best[j] still contains the previous row's state.
        if (
          i > 0 &&
          (grid[i - 1][j] === 2 || grid[i - 1][j] === 3) &&
          best[j] !== -1
        ) {
          // Add all paths reaching the top cell.
          currentWays = (currentWays + ways[j]) % MOD;

          // Update the maximum Adventure through the top cell.
          currentBest = Math.max(currentBest, best[j] + grid[i][j]);
        }

        // Replace the old state with the current cell's state.
        ways[j] = currentWays;
        best[j] = currentBest;
      }
    }

    // No valid path means both answers must be zero.
    if (best[n - 1] === -1) {
      return [0, 0];
    }

    // Return total paths and maximum Adventure.
    return [ways[n - 1], best[n - 1]];
  }
}
