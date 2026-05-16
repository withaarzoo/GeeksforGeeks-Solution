/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  findSmallest(arr) {
    // Sort numbers in increasing order
    arr.sort((a, b) => a - b);

    // Smallest value that cannot be formed
    let smallestMissing = 1;

    // Traverse array
    for (let num of arr) {
      // If a gap appears, stop
      if (num > smallestMissing) {
        break;
      }

      // Extend reachable range
      smallestMissing += num;
    }

    // Return final answer
    return smallestMissing;
  }
}
