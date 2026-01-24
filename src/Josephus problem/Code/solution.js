/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
class Solution {
    josephus(n, k) {
        let ans = 0; // 0-based index

        for (let i = 2; i <= n; i++) {
            ans = (ans + k) % i;
        }

        // Convert to 1-based index
        return ans + 1;
    }
}
