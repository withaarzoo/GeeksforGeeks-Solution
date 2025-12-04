/**
 * @param {number[]} keys
 * @param {number[]} freq
 * @returns {number}
 */

class Solution {
  minCost(keys, freq) {
    const n = keys.length;
    if (n === 0) return 0;

    // dp[i][j] = minimum cost of optimal BST using keys[i..j]
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // prefixFreq[k] = sum of freq[0..k-1]
    const prefixFreq = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
      prefixFreq[i + 1] = prefixFreq[i] + freq[i];
    }

    const rangeSum = (i, j) => prefixFreq[j + 1] - prefixFreq[i];

    // Base case: single key
    for (let i = 0; i < n; i++) {
      dp[i][i] = freq[i];
    }

    // length from 2 to n
    for (let len = 2; len <= n; len++) {
      for (let i = 0; i + len - 1 < n; i++) {
        const j = i + len - 1;
        let best = Number.MAX_SAFE_INTEGER;

        const sumFreq = rangeSum(i, j);

        // Try every key as root
        for (let r = i; r <= j; r++) {
          const left = r > i ? dp[i][r - 1] : 0;
          const right = r < j ? dp[r + 1][j] : 0;

          const cost = left + right + sumFreq;
          if (cost < best) best = cost;
        }

        dp[i][j] = best;
      }
    }

    return dp[0][n - 1];
  }
}
