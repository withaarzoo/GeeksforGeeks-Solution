/**
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
class Solution {
  mergeStones(stones, k) {
    const n = stones.length;
    if ((n - 1) % (k - 1) !== 0) return -1;

    // prefix sums
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) pref[i + 1] = pref[i] + stones[i];
    const rangeSum = (i, j) => pref[j + 1] - pref[i];

    const INF = 1e15;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len <= n; ++len) {
      for (let i = 0; i + len - 1 < n; ++i) {
        const j = i + len - 1;
        dp[i][j] = INF;
        for (let m = i; m < j; m += k - 1) {
          dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
        }
        if ((len - 1) % (k - 1) === 0) dp[i][j] += rangeSum(i, j);
      }
    }
    return dp[0][n - 1];
  }
}
