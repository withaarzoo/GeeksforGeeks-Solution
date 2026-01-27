class Solution {
  isWordExist(mat, word) {
    const n = mat.length;
    const m = mat[0].length;
    const dir = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const dfs = (i, j, idx) => {
      if (idx === word.length) return true;

      if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] !== word[idx])
        return false;

      const temp = mat[i][j];
      mat[i][j] = "#";

      for (let [dx, dy] of dir) {
        if (dfs(i + dx, j + dy, idx + 1)) return true;
      }

      mat[i][j] = temp;
      return false;
    };

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (dfs(i, j, 0)) return true;
      }
    }
    return false;
  }
}
