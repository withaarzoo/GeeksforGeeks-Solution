/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  isMaxHeap(arr) {
    let n = arr.length; // total elements

    // Loop through non-leaf nodes
    for (let i = 0; i <= Math.floor(n / 2) - 1; i++) {
      let left = 2 * i + 1; // left child index
      let right = 2 * i + 2; // right child index

      // Check left child
      if (left < n && arr[i] < arr[left]) {
        return false;
      }

      // Check right child
      if (right < n && arr[i] < arr[right]) {
        return false;
      }
    }

    return true; // valid max heap
  }
}
