/**
 * @param {number[]} arr
 * @return {number}
 */

class Solution {
  minCount(arr) {
    const n = arr.length; // Store the number of elements in the array.
    const NEG = -1000000000; // Represents an unreachable DP state.

    // prev[i][j] stores the maximum number of used elements after
    // the previous prefix, where i and j are the last indices of
    // the increasing and decreasing subsequences.
    let prev = Array.from({ length: n + 1 }, () => Array(n + 1).fill(NEG));

    prev[0][0] = 0; // Initially both subsequences are empty.

    // Process each array element from left to right.
    for (let k = 1; k <= n; k++) {
      // cur stores all states after processing arr[k - 1].
      const cur = Array.from({ length: n + 1 }, () => Array(n + 1).fill(NEG));

      // Try every possible pair of previous last indices.
      for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
          if (prev[i][j] === NEG) {
            continue; // Ignore states that cannot be reached.
          }

          // Option 1: Leave the current element unused.
          cur[i][j] = Math.max(cur[i][j], prev[i][j]);

          // Option 2: Put the current element into the increasing subsequence.
          // i === 0 means that this subsequence is currently empty.
          if (i === 0 || arr[k - 1] > arr[i - 1]) {
            cur[k][j] = Math.max(cur[k][j], prev[i][j] + 1);
          }

          // Option 3: Put the current element into the decreasing subsequence.
          // j === 0 means that this subsequence is currently empty.
          if (j === 0 || arr[k - 1] < arr[j - 1]) {
            cur[i][k] = Math.max(cur[i][k], prev[i][j] + 1);
          }
        }
      }

      // Use the current layer as the previous layer for the next element.
      prev = cur;
    }

    let best = 0; // Store the maximum number of elements used.

    // Find the best reachable final state.
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        best = Math.max(best, prev[i][j]);
      }
    }

    // The unused elements are the total elements minus the selected ones.
    return n - best;
  }
}
