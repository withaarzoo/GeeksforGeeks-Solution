/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */

class Solution {
    checkWithinK(arr, k) {
        const window = new Set();
        for (let i = 0; i < arr.length; i++) {
            if (window.has(arr[i])) return true;
            window.add(arr[i]);
            if (window.size > k) {
                window.delete(arr[i - k]);
            }
        }
        return false;
    }
}