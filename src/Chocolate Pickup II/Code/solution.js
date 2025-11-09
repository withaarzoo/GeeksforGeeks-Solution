/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
  chocolatePickup(mat) {
    const n = mat.length;
    const NEG = -1e9 | 0;

    if (mat[0][0] === -1 || mat[n - 1][n - 1] === -1) return 0;

    const make = () => Array.from({ length: n }, () => Array(n).fill(NEG));
    let dp = make();
    dp[0][0] = mat[0][0];

    for (let k = 1; k <= 2 * (n - 1); k++) {
      let ndp = make();

      for (let c1 = 0; c1 < n; c1++) {
        const r1 = k - c1;
        if (r1 < 0 || r1 >= n) continue;
        if (mat[r1][c1] === -1) continue;

        for (let c2 = 0; c2 < n; c2++) {
          const r2 = k - c2;
          if (r2 < 0 || r2 >= n) continue;
          if (mat[r2][c2] === -1) continue;

          let best = NEG;
          if (r1 - 1 >= 0 && r2 - 1 >= 0) best = Math.max(best, dp[c1][c2]);
          if (c1 - 1 >= 0 && r2 - 1 >= 0) best = Math.max(best, dp[c1 - 1][c2]);
          if (r1 - 1 >= 0 && c2 - 1 >= 0) best = Math.max(best, dp[c1][c2 - 1]);
          if (c1 - 1 >= 0 && c2 - 1 >= 0)
            best = Math.max(best, dp[c1 - 1][c2 - 1]);

          if (best === NEG) continue;

          let gain = mat[r1][c1];
          if (c1 !== c2) gain += mat[r2][c2];
          ndp[c1][c2] = Math.max(ndp[c1][c2], best + gain);
        }
      }
      dp = ndp;
    }
    const ans = dp[n - 1][n - 1];
    return ans < 0 ? 0 : ans;
  }
}
