/**
 * @param {String} s
 * @param {number[]} p
 * @return {number}
 */
class Solution {
    getMinimumDays(s, p) {
        let n = s.length;
        let day = new Array(n);
        for (let i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        let ans = 0;
        for (let i = 0; i < n - 1; i++) {
            if (s[i] === s[i + 1]) {
                ans = Math.max(ans, Math.min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
};