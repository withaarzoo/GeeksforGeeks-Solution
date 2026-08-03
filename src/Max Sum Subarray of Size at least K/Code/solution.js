/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

class Solution {
  maxSumWithK(arr, k) {
    const n = arr.length;

    // bestEndingHere[i] stores the maximum sum
    // of a subarray ending exactly at i.
    const bestEndingHere = new Array(n);

    // Base case.
    bestEndingHere[0] = arr[0];

    // Build Kadane array.
    for (let i = 1; i < n; i++) {
      // Either start new or extend previous.
      bestEndingHere[i] = Math.max(arr[i], bestEndingHere[i - 1] + arr[i]);
    }

    // First window sum.
    let windowSum = 0;

    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }

    // Initial answer.
    let ans = windowSum;

    // Slide the window.
    for (let i = k; i < n; i++) {
      // Remove left element.
      windowSum -= arr[i - k];

      // Add new right element.
      windowSum += arr[i];

      // Current window only.
      ans = Math.max(ans, windowSum);

      // Current window + best previous extension.
      ans = Math.max(ans, windowSum + bestEndingHere[i - k]);
    }

    return ans;
  }
}
