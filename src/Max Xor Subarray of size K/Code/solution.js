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

    // Sliding window
    for (let i = k; i < n; i++) {
      // Remove outgoing element
      currXor ^= arr[i - k];

      // Add incoming element
      currXor ^= arr[i];

      maxXor = Math.max(maxXor, currXor);
    }

    return maxXor;
  }
}
