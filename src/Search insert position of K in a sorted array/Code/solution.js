/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
  searchInsertK(arr, k) {
    let low = 0,
      high = arr.length - 1;

    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);

      // Found k
      if (arr[mid] === k) {
        return mid;
      }
      // Move right
      else if (arr[mid] < k) {
        low = mid + 1;
      }
      // Move left
      else {
        high = mid - 1;
      }
    }

    // Correct insert position
    return low;
  }
}
