/**
 * @param {number[][]} grid
 * @return {number}
 */
class Solution {
  // DFS function
  dfs(row, col, grid, vis, n, m) {
    // Mark visited
    vis[row][col] = true;

    // Direction arrays
    let dr = [-1, 1, 0, 0];
    let dc = [0, 0, -1, 1];

    // Explore all directions
    for (let i = 0; i < 4; i++) {
      let nr = row + dr[i];
      let nc = col + dc[i];

      // Check valid unvisited 1
      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < m &&
        grid[nr][nc] === 1 &&
        !vis[nr][nc]
      ) {
        this.dfs(nr, nc, grid, vis, n, m);
      }
    }
  }

  cntOnes(grid) {
    let n = grid.length;
    let m = grid[0].length;

    // Visited matrix
    let vis = Array.from({ length: n }, () => Array(m).fill(false));

    // Traverse first and last column
    for (let i = 0; i < n; i++) {
      if (grid[i][0] === 1 && !vis[i][0]) {
        this.dfs(i, 0, grid, vis, n, m);
      }

      if (grid[i][m - 1] === 1 && !vis[i][m - 1]) {
        this.dfs(i, m - 1, grid, vis, n, m);
      }
    }

    // Traverse first and last row
    for (let j = 0; j < m; j++) {
      if (grid[0][j] === 1 && !vis[0][j]) {
        this.dfs(0, j, grid, vis, n, m);
      }

      if (grid[n - 1][j] === 1 && !vis[n - 1][j]) {
        this.dfs(n - 1, j, grid, vis, n, m);
      }
    }

    let count = 0;

    // Count remaining 1s
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === 1 && !vis[i][j]) {
          count++;
        }
      }
    }

    return count;
  }
}
