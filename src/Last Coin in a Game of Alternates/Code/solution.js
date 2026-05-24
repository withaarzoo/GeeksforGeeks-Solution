/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  coin(arr) {
    // Pointer at the beginning
    let left = 0;

    // Pointer at the end
    let right = arr.length - 1;

    // Continue until only one coin remains
    while (left < right) {
      // Remove larger coin from left side
      if (arr[left] > arr[right]) {
        left++;
      } else {
        // Otherwise remove right coin
        right--;
      }
    }

    // Last remaining coin
    return arr[left];
  }
}
