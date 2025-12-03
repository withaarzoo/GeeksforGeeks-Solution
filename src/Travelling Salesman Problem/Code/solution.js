/**
 * @param {number[][]} cost
 * @returns {number}
 */

class Solution {
  tsp(cost) {
    const n = cost.length;
    const N = 1 << n;
    const INF = 1e9;

    // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
    const dp = Array.from({ length: N }, () => Array(n).fill(INF));

    dp[1][0] = 0; // only city 0 visited, we are at 0

    for (let mask = 0; mask < N; mask++) {
      for (let u = 0; u < n; u++) {
        if ((mask & (1 << u)) === 0) continue; // city u must be in mask
        const curCost = dp[mask][u];
        if (curCost === INF) continue; // unreachable

        // go to every not-visited city v
        for (let v = 0; v < n; v++) {
          if (mask & (1 << v)) continue; // already visited
          const newMask = mask | (1 << v);
          const newCost = curCost + cost[u][v];
          if (newCost < dp[newMask][v]) {
            dp[newMask][v] = newCost;
          }
        }
      }
    }

    const fullMask = N - 1;
    let ans = INF;

    // end at any city u and return to 0
    for (let u = 0; u < n; u++) {
      if (dp[fullMask][u] === INF) continue;
      ans = Math.min(ans, dp[fullMask][u] + cost[u][0]);
    }

    return ans;
  }
}
