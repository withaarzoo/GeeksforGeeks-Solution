/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  countIncreasing(arr) {
    let n = arr.length;

    // Final answer
    let ans = 0;

    // Length of current increasing segment
    let len = 1;

    for (let i = 1; i < n; i++) {
      // If increasing sequence continues
      if (arr[i] > arr[i - 1]) {
        len++;

        // Add number of new subarrays
        ans += len - 1;
      } else {
        // Reset length
        len = 1;
      }
    }

    return ans;
  }
}
