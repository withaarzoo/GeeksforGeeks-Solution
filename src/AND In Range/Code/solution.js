/**
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */

class Solution {
  andInRange(l, r) {
    let shift = 0;

    // While there exists any bit where l and r differ,
    // keep shifting right.
    while (l < r) {
      l >>= 1; // remove one low bit from l
      r >>= 1; // remove one low bit from r
      shift++; // count how many bits removed
    }

    // Now l == r, and holds the common prefix.
    // Shift back to restore length, filling with zeros.
    return l << shift;
  }
}
