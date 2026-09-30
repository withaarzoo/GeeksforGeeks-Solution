/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */

class Solution {
    ways(x, y) {
        const MOD = 1000000007;
        const dp = Array.from({ length: x + 1 }, () => Array(y + 1).fill(0));
        for (let i = 0; i <= x; i++) dp[i][0] = 1;
        for (let j = 0; j <= y; j++) dp[0][j] = 1;
        for (let i = 1; i <= x; i++) {
            for (let j = 1; j <= y; j++) {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
        return dp[x][y];
    }
}