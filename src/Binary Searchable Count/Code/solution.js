/**
 * @param {number[]} arr
 * @return {number}
 */

class Solution {
  binarySearchable(arr) {
    let count = 0;

    // I walk the implicit binary-search tree over index ranges.
    const dfs = (l, r, low, high) => {
      // An invalid range means there is nothing more to check.
      if (l > r) return;

      // I choose the same middle position binary search would use.
      const mid = Math.floor((l + r) / 2);
      const val = arr[mid];

      // If the current value respects all ancestor limits, I count it.
      if (val > low && val < high) {
        count++;
      }

      // Left half values must be smaller than the current middle value.
      dfs(l, mid - 1, low, Math.min(high, val));

      // Right half values must be larger than the current middle value.
      dfs(mid + 1, r, Math.max(low, val), high);
    };

    // I start with no restriction at the root.
    dfs(0, arr.length - 1, -Infinity, Infinity);

    return count;
  }
}
