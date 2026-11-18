/**
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */

class Solution {
    findXOR(l, r) {
        return this.xorUpto(r) ^ this.xorUpto(l - 1);
    }
    
    xorUpto(n) {
        if (n % 4 === 0) return n;
        if (n % 4 === 1) return 1;
        if (n % 4 === 2) return n + 1;
        return 0;
    }
}