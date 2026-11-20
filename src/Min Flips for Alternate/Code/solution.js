/**
 * @param {string} s
 * @returns {number}
 */

class Solution {
    minFlips(s) {
        let n = s.length;
        let flips0 = 0, flips1 = 0;
        for (let i = 0; i < n; i++) {
            let expected0 = (i % 2 === 0) ? '0' : '1';
            let expected1 = (i % 2 === 0) ? '1' : '0';
            if (s[i] !== expected0) flips0++;
            if (s[i] !== expected1) flips1++;
        }
        return Math.min(flips0, flips1);
    }
}