/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  find(arr) {
    // Minimum value needed after the last element
    let need = 0;

    // Traverse from right to left
    for (let i = arr.length - 1; i >= 0; i--) {
      // Ceiling of (need + arr[i]) / 2
      need = Math.floor((need + arr[i] + 1) / 2);
    }

    // Return the smallest valid starting value
    return need;
  }
}
