/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} costS1
 * @param {number} costS2
 * @returns {number}
 */

class Solution {
    findMinCost(s1, s2, costS1, costS2) {
        let n = s1.length, m = s2.length;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [n, m] = [m, n];
            [costS1, costS2] = [costS2, costS1];
        }
        let prev = new Array(m + 1).fill(0);
        let curr = new Array(m + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (s1[i - 1] === s2[j - 1])
                    curr[j] = prev[j - 1] + 1;
                else
                    curr[j] = Math.max(prev[j], curr[j - 1]);
            }
            [prev, curr] = [curr, prev];
        }
        let lcs = prev[m];
        return (n - lcs) * costS1 + (m - lcs) * costS2;
    }
}