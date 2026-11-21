/**
 * @param {number[]} arr
 * @param {number} x
 * @return {number}
 */

class Solution {
    smallestSubWithSum(arr, x) {
        let n = arr.length;
        let left = 0;
        let sum = 0;
        let minLen = n + 1;
        for (let right = 0; right < n; right++) {
            sum += arr[right];
            while (sum > x && left <= right) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= arr[left];
                left++;
            }
        }
        return (minLen === n + 1) ? 0 : minLen;
    }
}