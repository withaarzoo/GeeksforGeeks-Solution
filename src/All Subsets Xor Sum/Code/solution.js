/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  subsetXORSum(arr) {
    const n = arr.length;

    // Step 1: OR of all elements
    let allOr = 0;
    for (const x of arr) {
      allOr |= x; // add all bits that appear in the array
    }

    // Step 2: each present bit contributes in exactly 2^(n-1) subsets
    // Use BigInt for safety, then convert back to Number.
    let multiplier = 1n << BigInt(n - 1);
    let ans = BigInt(allOr) * multiplier;

    return Number(ans); // guarantees within 32-bit as per problem
  }
}
