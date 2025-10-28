/**
 * @param {number[][]} grid
 * @returns {number[][]}
 */
class Solution {
  nearest(grid) {
    const m = grid.length;
    if (m === 0) return [];
    const n = grid[0].length;
    const dist = Array.from({ length: m }, () => Array(n).fill(-1));

    // Efficient queue using head index
    const q = [];
    let head = 0;

    // Initialize with all ones
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (grid[i][j] === 1) {
          dist[i][j] = 0;
          q.push([i, j]);
        }
      }
    }

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    // BFS
    while (head < q.length) {
      const [r, c] = q[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === -1) {
          dist[nr][nc] = dist[r][c] + 1;
          q.push([nr, nc]);
        }
      }
    }

    return dist;
  }
}
