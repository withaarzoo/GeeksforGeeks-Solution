/*
 * @param {number} x
 * @param {number} s
 * @param {number} m
 * @param {number} l
 * @param {number} cs
 * @param {number} cm
 * @param {number} cl
 * @return {number}
 */
class Solution {
    minimumCost(x, s, m, l, cs, cm, cl) {
        let mx = Math.max(s, m, l);
        let MAX = x + mx;
        let INF = 1e9;
        let dp = new Array(MAX + 1).fill(INF);
        dp[0] = 0;
        for (let i = 0; i <= MAX; i++) {
            if (dp[i] === INF) continue;
            if (i + s <= MAX) dp[i + s] = Math.min(dp[i + s], dp[i] + cs);
            if (i + m <= MAX) dp[i + m] = Math.min(dp[i + m], dp[i] + cm);
            if (i + l <= MAX) dp[i + l] = Math.min(dp[i + l], dp[i] + cl);
        }
        let ans = INF;
        for (let i = x; i <= MAX; i++) ans = Math.min(ans, dp[i]);
        return ans;
    }
}