/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    minOperation(n) {
        let ops = 0;
        while (n > 0) {
            if (n % 2 === 1) n--;
            else n = Math.floor(n / 2);
            ops++;
        }
        return ops;
    }
}