class Solution {
  orangesRot(mat) {
    let n = mat.length,
      m = mat[0].length;
    let q = [];
    let fresh = 0;

    // Step 1
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (mat[i][j] === 2) q.push([i, j]);
        if (mat[i][j] === 1) fresh++;
      }
    }

    let dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    let time = 0;

    // Step 2: BFS
    while (q.length && fresh > 0) {
      let size = q.length;
      time++;

      for (let i = 0; i < size; i++) {
        let [x, y] = q.shift();

        for (let [dx, dy] of dirs) {
          let nx = x + dx;
          let ny = y + dy;

          if (nx >= 0 && ny >= 0 && nx < n && ny < m && mat[nx][ny] === 1) {
            mat[nx][ny] = 2;
            q.push([nx, ny]);
            fresh--;
          }
        }
      }
    }

    return fresh === 0 ? time : -1;
  }
}
