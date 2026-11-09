/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

class Solution {
    getCount(s, k) {
        let cnt = new Array(26).fill(0);
        let n = s.length;
        for (let i = 0; i < n; i++) {
            if (i === 0 || s[i] !== s[i - 1]) {
                cnt[s.charCodeAt(i) - 97]++;
            }
        }
        let ans = 0;
        for (let i = 0; i < 26; i++) {
            if (cnt[i] === k) ans++;
        }
        return ans;
    }
}
