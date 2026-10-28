/**
 * @param {number} n
 * @return {string}
 */
class Solution {
    nthCharacter(n) {
        let digits = 1;
        let count = 9;
        let start = 1;
        
        while (n > digits * count) {
            n -= digits * count;
            digits++;
            count *= 10;
            start *= 10;
        }
        
        let num = start + Math.floor((n - 1) / digits);
        let s = num.toString();
        return s[(n - 1) % digits];
    }
}