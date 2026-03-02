/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  maxWater(arr) {
    const n = arr.length;
    if (n <= 2) return 0;

    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
      if (arr[left] < arr[right]) {
        if (arr[left] >= leftMax) {
          leftMax = arr[left];
        } else {
          water += leftMax - arr[left];
        }
        left++;
      } else {
        if (arr[right] >= rightMax) {
          rightMax = arr[right];
        } else {
          water += rightMax - arr[right];
        }
        right--;
      }
    }

    return water;
  }
}
