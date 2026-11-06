/**
 * @param {number} h
 * @returns {number}
 */
class Solution {
    countBT(h) {
        const MOD = 1000000007n;
        if (h === 1) return 1;
        let prev2 = 1n, prev1 = 1n;
        for (let i = 2; i <= h; i++) {
            let curr = (prev1 * prev1 % MOD + 2n * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return Number(prev1);
    }
}
