/**
 * @param {string} s
 * @param {string} t
 * @param {Array<Array<string>>} transform  // each element is [xChar, yChar]
 * @param {number[]} cost
 * @returns {number}
 */
class Solution {
  minCost(s, t, transform, cost) {
    const ALPHA = 26;
    const INF = 1e12;
    // initialize dist
    const dist = Array.from({ length: ALPHA }, () => Array(ALPHA).fill(INF));
    for (let i = 0; i < ALPHA; ++i) dist[i][i] = 0;
    // add transforms
    for (let i = 0; i < transform.length; ++i) {
      const u = transform[i][0].charCodeAt(0) - 97;
      const v = transform[i][1].charCodeAt(0) - 97;
      dist[u][v] = Math.min(dist[u][v], cost[i]);
    }
    // Floyd-Warshall
    for (let k = 0; k < ALPHA; ++k) {
      for (let i = 0; i < ALPHA; ++i) {
        if (dist[i][k] === INF) continue;
        for (let j = 0; j < ALPHA; ++j) {
          if (dist[k][j] === INF) continue;
          const via = dist[i][k] + dist[k][j];
          if (via < dist[i][j]) dist[i][j] = via;
        }
      }
    }
    if (s.length !== t.length) return -1;
    let ans = 0;
    for (let i = 0; i < s.length; ++i) {
      const cs = s.charCodeAt(i) - 97;
      const ct = t.charCodeAt(i) - 97;
      if (cs === ct) continue;
      let best = INF;
      for (let c = 0; c < ALPHA; ++c) {
        if (dist[cs][c] < INF && dist[ct][c] < INF) {
          best = Math.min(best, dist[cs][c] + dist[ct][c]);
        }
      }
      if (best === INF) return -1;
      ans += best;
    }
    return ans;
  }
}
