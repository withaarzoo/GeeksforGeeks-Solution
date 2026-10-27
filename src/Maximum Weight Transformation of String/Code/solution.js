/**
 * @param {string} s
 * @returns {number}
 */
class Solution {
    getMaxWeight(s) {
        let n = s.length;
        if (n === 0) return 0;
        let m = n - 1;
        let gain = new Array(m);
        for (let i = 0; i < m; i++) {
            gain[i] = (s[i] === s[i + 1] ? 1 : 2);
        }
        let dp = new Array(m + 1).fill(0);
        for (let i = 1; i <= m; i++) {
            dp[i] = Math.max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + gain[i - 1]);
        }
        return n + dp[m];
    }
}