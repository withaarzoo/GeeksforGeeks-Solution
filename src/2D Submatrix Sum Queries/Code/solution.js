class Solution {
  prefixSum2D(mat, queries) {
    const n = mat.length;
    const m = mat[0].length;

    const prefix = Array.from({ length: n }, () => Array(m).fill(0));

    // Build prefix matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        prefix[i][j] = mat[i][j];

        if (i > 0) prefix[i][j] += prefix[i - 1][j];
        if (j > 0) prefix[i][j] += prefix[i][j - 1];
        if (i > 0 && j > 0) prefix[i][j] -= prefix[i - 1][j - 1];
      }
    }

    const result = [];

    // Answer queries
    for (const q of queries) {
      const [r1, c1, r2, c2] = q;

      let sum = prefix[r2][c2];

      if (r1 > 0) sum -= prefix[r1 - 1][c2];
      if (c1 > 0) sum -= prefix[r2][c1 - 1];
      if (r1 > 0 && c1 > 0) sum += prefix[r1 - 1][c1 - 1];

      result.push(sum);
    }

    return result;
  }
}
