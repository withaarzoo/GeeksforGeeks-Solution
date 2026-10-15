/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    maxValue(n) {
        let res = 0;
        let consec = 0;
        for (let i = 30; i >= 0; i--) {
            if (n & (1 << i)) {
                if (consec < 2) {
                    res |= (1 << i);
                    consec++;
                } else {
                    consec = 0;
                }
            } else {
                consec = 0;
            }
        }
        return res;
    }
}
