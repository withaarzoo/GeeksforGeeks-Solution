/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
class Solution {
  minCutCost(n, cuts) {
    // Add endpoints and sort
    cuts.push(0);
    cuts.push(n);
    cuts.sort((a, b) => a - b);
    const m = cuts.length;
    // dp[i][j] = min cost to cut between cuts[i] and cuts[j]
    const dp = Array.from({ length: m }, () => new Array(m).fill(0));
    for (let len = 2; len < m; ++len) {
      for (let i = 0; i + len < m; ++i) {
        const j = i + len;
        let best = Number.POSITIVE_INFINITY;
        for (let k = i + 1; k < j; ++k) {
          const cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
          if (cost < best) best = cost;
        }
        dp[i][j] = best === Number.POSITIVE_INFINITY ? 0 : best;
      }
    }
    return dp[0][m - 1];
  }
}
