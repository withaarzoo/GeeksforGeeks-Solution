/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
  maxSubarrayXOR(arr, k) {
    let n = arr.length;
    let currXor = 0;

    // XOR of first window
    for (let i = 0; i < k; i++) {
      currXor ^= arr[i];
    }

    let maxXor = currXor;

    // Slide the window
    for (let i = k; i < n; i++) {
      currXor ^= arr[i - k]; // remove left
      currXor ^= arr[i]; // add right
      maxXor = Math.max(maxXor, currXor);
    }

    return maxXor;
  }
}
