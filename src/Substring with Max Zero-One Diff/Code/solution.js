/**
 * @param {string} s
 * @returns {number}
 */

class Solution {
  maxSubstring(s) {
    // Stores maximum difference found so far
    let maxSum = -1;

    // Stores current substring sum
    let currentSum = 0;

    for (let ch of s) {
      // Convert:
      // '0' -> +1
      // '1' -> -1
      let value = ch === "0" ? 1 : -1;

      // Extend current substring
      currentSum += value;

      // Update maximum answer
      maxSum = Math.max(maxSum, currentSum);

      // Reset if current sum becomes negative
      if (currentSum < 0) {
        currentSum = 0;
      }
    }

    return maxSum;
  }
}
