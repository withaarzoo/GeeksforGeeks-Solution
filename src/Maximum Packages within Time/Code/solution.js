/**
 * @param {number[]} arr
 * @param {number} totalTime
 * @returns {number}
 */
class Solution {
  maxPackages(arr, totalTime) {
    let n = arr.length;
    let k = Math.min(n, totalTime);
    if (k === 0) return 0;

    let sum = 0;
    for (let i = 0; i < k; i++) sum += arr[i];
    let ans = sum;

    for (let i = k; i < n; i++) {
      sum += arr[i] - arr[i - k];
      ans = Math.max(ans, sum);
    }
    return ans;
  }
}
