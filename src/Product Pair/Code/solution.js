/**
 * @param {number[]} arr
 * @param {number} target
 * @returns {boolean}
 */

class Solution {
  isProduct(arr, target) {
    // Set to store visited elements
    let seen = new Set();

    // Traverse array
    for (let num of arr) {
      // Handle zero separately
      if (num === 0) {
        // If target is zero and
        // some previous element exists
        if (target === 0 && seen.size > 0) {
          return true;
        }

        // Store zero
        seen.add(num);
        continue;
      }

      // If target is not divisible,
      // no pair can be formed
      if (target % num !== 0) {
        seen.add(num);
        continue;
      }

      // Find required partner
      let needed = target / num;

      // Check if partner exists
      if (seen.has(needed)) {
        return true;
      }

      // Store current element
      seen.add(num);
    }

    // No valid pair exists
    return false;
  }
}
