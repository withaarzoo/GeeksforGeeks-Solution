/*
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  maxCircularSum(arr) {
    if (!arr || arr.length === 0) return 0;

    let total = arr[0];
    let maxEnding = arr[0],
      maxSoFar = arr[0];
    let minEnding = arr[0],
      minSoFar = arr[0];

    for (let i = 1; i < arr.length; ++i) {
      let x = arr[i];
      // Kadane for max subarray
      maxEnding = Math.max(x, maxEnding + x);
      if (maxEnding > maxSoFar) maxSoFar = maxEnding;

      // Kadane for min subarray
      minEnding = Math.min(x, minEnding + x);
      if (minEnding < minSoFar) minSoFar = minEnding;

      total += x;
    }

    // If all numbers are negative, maxSoFar will be the largest (negative) element
    if (maxSoFar < 0) return maxSoFar;

    // wrapping max = total - min subarray
    const wrapMax = total - minSoFar;
    return Math.max(maxSoFar, wrapMax);
  }
}
