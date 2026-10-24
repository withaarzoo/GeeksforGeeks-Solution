/**
 * @param {number} n
 * @param {number} m
 * @param {String} s
 * @return {Boolean}
 */
class Solution {
    isPossible(n, m, s) {
        let minR = 0, maxR = 0, minC = 0, maxC = 0;
        let r = 0, c = 0;
        for (let ch of s) {
            if (ch === 'L') c--;
            else if (ch === 'R') c++;
            else if (ch === 'D') r--;
            else if (ch === 'U') r++;
            minR = Math.min(minR, r);
            maxR = Math.max(maxR, r);
            minC = Math.min(minC, c);
            maxC = Math.max(maxC, c);
        }
        return (maxR - minR < n) && (maxC - minC < m);
    }
};