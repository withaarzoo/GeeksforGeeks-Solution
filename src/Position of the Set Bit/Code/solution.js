/**
 * @param {number} n
 * @returns {number}
 */

class Solution {
  findPosition(n) {
    // If n is 0, no set bit
    if (n === 0) return -1;

    // Check for exactly one set bit
    if ((n & (n - 1)) !== 0) return -1;

    let position = 1; // Start from LSB

    // Loop through bits
    while (n > 0) {
      // If current bit is 1, return position
      if ((n & 1) === 1) return position;

      // Shift right
      n = n >> 1;

      position++;
    }

    return -1;
  }
}
