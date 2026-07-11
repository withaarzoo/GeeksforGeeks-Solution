class Solution {
  // DFS returns longest distance from current cell
  dfs(mat, vis, x, y, xd, yd) {
    // Destination reached
    if (x === xd && y === yd) return 0;

    // Mark current cell as visited
    vis[x][y] = true;

    let ans = -1;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    // Explore all four directions
    for (let k = 0; k < 4; k++) {
      let nx = x + dx[k];
      let ny = y + dy[k];

      // Check whether next cell is valid
      if (
        nx >= 0 &&
        nx < this.n &&
        ny >= 0 &&
        ny < this.m &&
        mat[nx][ny] === 1 &&
        !vis[nx][ny]
      ) {
        let cur = this.dfs(mat, vis, nx, ny, xd, yd);

        // Update answer if destination is reachable
        if (cur !== -1) ans = Math.max(ans, cur + 1);
      }
    }

    // Backtrack
    vis[x][y] = false;

    return ans;
  }

  longestPath(mat, xs, ys, xd, yd) {
    this.n = mat.length;
    this.m = mat[0].length;

    // Source or destination is blocked
    if (mat[xs][ys] === 0 || mat[xd][yd] === 0) return -1;

    // Visited matrix
    const vis = Array.from({ length: this.n }, () => Array(this.m).fill(false));

    return this.dfs(mat, vis, xs, ys, xd, yd);
  }
}
