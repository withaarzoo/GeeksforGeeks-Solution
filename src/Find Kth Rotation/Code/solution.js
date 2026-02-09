/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
  findKRotation(arr) {
    let low = 0;
    let high = arr.length - 1;

    // Binary search to find minimum element
    while (low < high) {
      let mid = Math.floor((low + high) / 2);

      // If mid is greater than last, min is on right
      if (arr[mid] > arr[high]) {
        low = mid + 1;
      }
      // Else min is on left or mid
      else {
        high = mid;
      }
    }

    // low is the index of minimum element
    return low;
  }
}
