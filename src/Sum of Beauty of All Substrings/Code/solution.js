/**
 * @param {string} s
 * @return {number}
 */
class Solution {
    beautySum(s) {
        let n = s.length;
        let ans = 0;
        for (let i = 0; i < n; i++) {
            let freq = new Array(26).fill(0);
            for (let j = i; j < n; j++) {
                freq[s.charCodeAt(j) - 97]++;
                let mx = 0, mn = n + 1;
                for (let k = 0; k < 26; k++) {
                    if (freq[k] > 0) {
                        mx = Math.max(mx, freq[k]);
                        mn = Math.min(mn, freq[k]);
                    }
                }
                ans += mx - mn;
            }
        }
        return ans;
    }
}