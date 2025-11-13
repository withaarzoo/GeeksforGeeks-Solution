/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @returns {boolean}
 */
class Solution {
  isInterleave(s1, s2, s3) {
    let n = s1.length,
      m = s2.length;
    if (n + m !== s3.length) return false;

    // Ensure s2 is the shorter string for smaller dp array
    if (m > n) {
      [s1, s2] = [s2, s1];
      [n, m] = [m, n];
    }

    const dp = new Array(m + 1).fill(false);
    dp[0] = true;

    // initialize using only s2
    for (let j = 1; j <= m; ++j) {
      dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
    }

    for (let i = 1; i <= n; ++i) {
      dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
      for (let j = 1; j <= m; ++j) {
        const takeFromS1 = dp[j] && s1[i - 1] === s3[i + j - 1];
        const takeFromS2 = dp[j - 1] && s2[j - 1] === s3[i + j - 1];
        dp[j] = takeFromS1 || takeFromS2;
      }
    }

    return dp[m];
  }
}
