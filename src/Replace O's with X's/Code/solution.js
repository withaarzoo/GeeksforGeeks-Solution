class Solution {
  fill(grid) {
    if (!grid || grid.length === 0) return;
    const n = grid.length,
      m = grid[0].length;
    const q = [];

    function pushIfO(r, c) {
      if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] === "O") {
        grid[r][c] = "T";
        q.push([r, c]);
      }
    }

    // Step 1: Add all border 'O's
    for (let i = 0; i < n; i++) {
      pushIfO(i, 0);
      pushIfO(i, m - 1);
    }
    for (let j = 0; j < m; j++) {
      pushIfO(0, j);
      pushIfO(n - 1, j);
    }

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    // Step 2: BFS
    while (q.length) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === "O") {
          grid[nr][nc] = "T";
          q.push([nr, nc]);
        }
      }
    }

    // Step 3: Flip and restore
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (grid[r][c] === "O") grid[r][c] = "X";
        else if (grid[r][c] === "T") grid[r][c] = "O";
      }
    }
  }
}
