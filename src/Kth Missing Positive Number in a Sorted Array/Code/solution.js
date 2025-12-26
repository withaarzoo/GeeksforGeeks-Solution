/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
  kthMissing(arr, k) {
    let left = 0,
      right = arr.length - 1;

    // Binary search
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      // Count missing numbers before arr[mid]
      let missing = arr[mid] - (mid + 1);

      if (missing < k) left = mid + 1;
      else right = mid - 1;
    }

    // kth missing number
    return left + k;
  }
}
