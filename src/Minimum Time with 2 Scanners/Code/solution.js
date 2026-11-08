/**
 * @param {number} n
 * @param {number} s1
 * @param {number} s2
 * @returns {number}
 */
class Solution {
    minTime(n, s1, s2) {
        let low = 0;
        let high = Math.min(s1, s2) * n;
        while (low < high) {
            let mid = Math.floor(low + (high - low) / 2);
            if (Math.floor(mid / s1) + Math.floor(mid / s2) >= n)
                high = mid;
            else
                low = mid + 1;
        }
        return low;
    }
}