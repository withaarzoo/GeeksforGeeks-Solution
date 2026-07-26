/**
 * @param {number[]} arr
 * @return {number[][]}
 */
class Solution {
  levelSort(arr) {
    // Store the final answer
    const ans = [];

    // Current index in the array
    let index = 0;

    // Number of nodes at the current level
    let levelSize = 1;

    // Process every array element
    while (index < arr.length) {
      // Store one level
      const level = [];

      // Take at most levelSize elements
      for (let i = 0; i < levelSize && index < arr.length; i++) {
        level.push(arr[index]);
        index++;
      }

      // Sort only the current level
      level.sort((a, b) => a - b);

      // Save it
      ans.push(level);

      // Next level has twice the nodes
      levelSize *= 2;
    }

    // Return all sorted levels
    return ans;
  }
}
