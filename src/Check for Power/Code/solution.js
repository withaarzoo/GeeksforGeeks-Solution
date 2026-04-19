/**
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
class Solution {
  isPower(x, y) {
    // Special case: only 1^anything = 1
    if (x === 1) {
      return y === 1;
    }

    // Keep dividing y by x while divisible
    while (y % x === 0) {
      y = Math.floor(y / x);
    }

    // If y becomes 1, then it is a power of x
    return y === 1;
  }
}
