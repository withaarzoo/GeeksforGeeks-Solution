class Solution {
  countCoordinates(mat) {
    // Store the number of rows and columns.
    const n = mat.length;
    const m = mat[0].length;

    // These matrices store which towers can reach each station.
    const reachP = Array.from({ length: n }, () => Array(m).fill(false));
    const reachQ = Array.from({ length: n }, () => Array(m).fill(false));

    // These four pairs represent down, up, right, and left movement.
    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];

    // This function runs reverse DFS from all boundary cells of one station.
    const dfs = (sources, visited) => {
      // I use an array as a stack to avoid recursive call stack problems.
      const stack = [];

      // Add every source cell once.
      for (const [r, c] of sources) {
        if (!visited[r][c]) {
          visited[r][c] = true;
          stack.push([r, c]);
        }
      }

      // Process every cell that can reach this station.
      while (stack.length > 0) {
        const [r, c] = stack.pop();

        // Check all four neighbouring cells.
        for (let d = 0; d < 4; d++) {
          const nr = r + dr[d];
          const nc = c + dc[d];

          // Skip coordinates outside the matrix.
          if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

          // Skip cells already found for this station.
          if (visited[nr][nc]) continue;

          // In reverse, I can move only to an equal or higher tower.
          if (mat[nr][nc] < mat[r][c]) continue;

          // This tower can also reach the same station.
          visited[nr][nc] = true;
          stack.push([nr, nc]);
        }
      }
    };

    // Collect the top row and left column for Station P.
    const sourcesP = [];
    for (let j = 0; j < m; j++) sourcesP.push([0, j]);
    for (let i = 0; i < n; i++) sourcesP.push([i, 0]);

    // Collect the bottom row and right column for Station Q.
    const sourcesQ = [];
    for (let j = 0; j < m; j++) sourcesQ.push([n - 1, j]);
    for (let i = 0; i < n; i++) sourcesQ.push([i, m - 1]);

    // Find all towers that can reach each station.
    dfs(sourcesP, reachP);
    dfs(sourcesQ, reachQ);

    // Count towers that can reach both stations.
    let answer = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (reachP[i][j] && reachQ[i][j]) answer++;
      }
    }

    return answer;
  }
}
