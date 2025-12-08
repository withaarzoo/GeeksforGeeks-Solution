/**
 * @param {number[]} arr
 * @returns {string}
 */
class Solution {
  matrixChainOrder(arr) {
    const n = arr.length;
    const N = n - 1; // number of matrices

    // dp[i][j]: minimum cost from matrix i to j (1-based)
    const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
    // split[i][j]: best split position k
    const split = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

    for (let len = 2; len <= N; len++) {
      for (let i = 1; i + len - 1 <= N; i++) {
        const j = i + len - 1;
        let best = Number.MAX_SAFE_INTEGER;
        let bestK = i;

        for (let k = i; k < j; k++) {
          const cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
          if (cost < best) {
            best = cost;
            bestK = k;
          }
        }
        dp[i][j] = best;
        split[i][j] = bestK;
      }
    }

    // recursive builder
    const build = (i, j) => {
      if (i === j) {
        return String.fromCharCode("A".charCodeAt(0) + (i - 1));
      }
      const k = split[i][j];
      const left = build(i, k);
      const right = build(k + 1, j);
      return "(" + left + right + ")";
    };

    return build(1, N);
  }
}
