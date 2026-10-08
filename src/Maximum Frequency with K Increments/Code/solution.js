/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
    maxFrequency(arr, k) {
        arr.sort((a, b) => a - b);
        let sum = 0;
        let left = 0;
        let ans = 1;
        for (let right = 0; right < arr.length; right++) {
            sum += arr[right];
            while (arr[right] * (right - left + 1) - sum > k) {
                sum -= arr[left];
                left++;
            }
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}