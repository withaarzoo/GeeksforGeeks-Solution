/**
 * @param {number[]} arr
 */
class Solution {
  segregate0and1(arr) {
    let left = 0;
    let right = arr.length - 1;

    // Continue until both pointers cross each other
    while (left < right) {
      // Move left pointer forward if current value is 0
      while (left < right && arr[left] === 0) {
        left++;
      }

      // Move right pointer backward if current value is 1
      while (left < right && arr[right] === 1) {
        right--;
      }

      // Swap misplaced elements
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }
  }
}
