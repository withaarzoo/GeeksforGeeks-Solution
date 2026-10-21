/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    minSubarraySum(arr) {
        let n = arr.length;
        let minEnding = arr[0];
        let minSoFar = arr[0];
        for (let i = 1; i < n; i++) {
            minEnding = Math.min(arr[i], minEnding + arr[i]);
            minSoFar = Math.min(minSoFar, minEnding);
        }
        return minSoFar;
    }
}