/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

class Solution {
    firstElementKTime(arr, k) {
        const freq = new Map();
        for (const num of arr) {
            freq.set(num, (freq.get(num) || 0) + 1);
            if (freq.get(num) === k) {
                return num;
            }
        }
        return -1;
    }
}