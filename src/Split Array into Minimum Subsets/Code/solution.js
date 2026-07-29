/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  minSubsets(arr) {
    // Store all numbers for constant-time lookup
    const set = new Set(arr);

    let ans = 0;

    // Check whether each number is the start of a sequence
    for (const x of arr) {
      // If x-1 is missing, this starts a new subset
      if (!set.has(x - 1)) {
        ans++;
      }
    }

    // Return total subsets
    return ans;
  }
}
