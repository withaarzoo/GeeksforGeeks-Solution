/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
class Solution {
  findUnion(a, b) {
    // Create a Set to store unique elements
    const set = new Set();

    // Insert elements from array a
    for (let num of a) {
      set.add(num);
    }

    // Insert elements from array b
    for (let num of b) {
      set.add(num);
    }

    // Convert Set to array
    return Array.from(set);
  }
}
