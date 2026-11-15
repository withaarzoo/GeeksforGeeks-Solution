/**
 * @param {string} s
 * @return {number}
 */

class Solution {
    subsequenceSum(s) {
        const MOD = 1000000007;
        let sum = 0;
        const n = s.length;
        for (let i = 0; i < n; i++) {
            sum = (sum + (s.charCodeAt(i) - 48)) % MOD;
        }
        let pow2 = 1;
        for (let i = 0; i < n - 1; i++) {
            pow2 = (pow2 * 2) % MOD;
        }
        return Number((BigInt(sum) * BigInt(pow2)) % BigInt(MOD));
    }
}