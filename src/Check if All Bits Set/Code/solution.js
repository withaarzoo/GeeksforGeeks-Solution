/**
 * @param {number} n
 * @return {boolean}
 */

class Solution {
  isBitSet(n) {
    // 0 does not have all bits set
    if (n === 0) return false;

    // If all bits are set,
    // n & (n + 1) becomes 0
    return (n & (n + 1)) === 0;
  }
}
