/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
  nextGreater(arr) {
    const n = arr.length;
    const result = new Array(n).fill(-1); // Initialize result array with -1
    const stack = []; // Stack to store indices

    // Traverse the array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
      const currentIndex = i % n; // Get actual array index
      const currentElement = arr[currentIndex];

      // Pop elements from stack while current element is greater
      while (
        stack.length > 0 &&
        arr[stack[stack.length - 1]] < currentElement
      ) {
        const index = stack.pop();
        result[index] = currentElement; // Found next greater element
      }

      // Only push during first pass to avoid duplicates
      if (i < n) {
        stack.push(currentIndex);
      }
    }

    return result;
  }
}
