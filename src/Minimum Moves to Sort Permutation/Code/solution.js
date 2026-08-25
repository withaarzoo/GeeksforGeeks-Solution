/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  minMoves(arr) {
    const n = arr.length; // Store the total number of elements in the permutation.

    const pos = new Array(n + 1); // pos[value] will store the index of that value.

    for (let i = 0; i < n; i++) {
      pos[arr[i]] = i; // Save each value's position for direct O(1) comparison later.
    }

    let current = 1; // A single value is always a valid consecutive sequence.
    let longest = 1; // Store the maximum sequence length found so far.

    for (let value = 1; value < n; value++) {
      // If value appears before value + 1, both can remain untouched.
      if (pos[value] < pos[value + 1]) {
        current++; // Extend the current valid sequence.
      } else {
        current = 1; // Reset because the consecutive values are in the wrong order.
      }

      longest = Math.max(longest, current); // Keep track of the longest valid sequence.
    }

    return n - longest; // Every value outside that sequence must be moved to an end.
  }
}
