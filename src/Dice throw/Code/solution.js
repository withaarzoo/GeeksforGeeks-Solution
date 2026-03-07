class Solution {
  noOfWays(m, n, x) {
    let dp = new Array(x + 1).fill(0);
    dp[0] = 1;

    for (let dice = 1; dice <= n; dice++) {
      let temp = new Array(x + 1).fill(0);

      for (let sum = 1; sum <= x; sum++) {
        for (let face = 1; face <= m; face++) {
          if (sum - face >= 0) {
            temp[sum] += dp[sum - face];
          }
        }
      }

      dp = temp;
    }

    return dp[x];
  }
}
