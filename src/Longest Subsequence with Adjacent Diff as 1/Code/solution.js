/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  longestSubseq(arr) {
    // dp stores the longest valid subsequence ending with each value.
    const dp = new Map();

    // This stores the longest subsequence found so far.
    let ans = 0;

    // Process elements from left to right so subsequence order is preserved.
    for (const x of arr) {
      // Get the best subsequence ending at x - 1, or 0 if it does not exist.
      const left = dp.get(x - 1) || 0;

      // Get the best subsequence ending at x + 1, or 0 if it does not exist.
      const right = dp.get(x + 1) || 0;

      // Extend the better neighboring subsequence using the current value x.
      const current = Math.max(left, right) + 1;

      // Store the longest subsequence ending with x.
      dp.set(x, current);

      // Update the overall maximum answer.
      ans = Math.max(ans, current);
    }

    // Return the length of the longest valid subsequence.
    return ans;
  }
}
