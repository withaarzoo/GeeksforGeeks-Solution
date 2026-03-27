class Solution {
  maxChocolate(grid) {
    let n = grid.length;
    let m = grid[0].length;

    let dp = Array.from({ length: m }, () => Array(m).fill(0));

    // Base case
    for (let c1 = 0; c1 < m; c1++) {
      for (let c2 = 0; c2 < m; c2++) {
        dp[c1][c2] =
          c1 === c2 ? grid[n - 1][c1] : grid[n - 1][c1] + grid[n - 1][c2];
      }
    }

    for (let row = n - 2; row >= 0; row--) {
      let temp = Array.from({ length: m }, () => Array(m).fill(0));

      for (let c1 = 0; c1 < m; c1++) {
        for (let c2 = 0; c2 < m; c2++) {
          let maxVal = 0;

          for (let d1 = -1; d1 <= 1; d1++) {
            for (let d2 = -1; d2 <= 1; d2++) {
              let nc1 = c1 + d1;
              let nc2 = c2 + d2;

              if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m) {
                let val = dp[nc1][nc2];

                if (c1 === c2) val += grid[row][c1];
                else val += grid[row][c1] + grid[row][c2];

                maxVal = Math.max(maxVal, val);
              }
            }
          }

          temp[c1][c2] = maxVal;
        }
      }

      dp = temp;
    }

    return dp[0][m - 1];
  }
}
