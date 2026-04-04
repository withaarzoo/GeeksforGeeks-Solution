/**
 * @param {number} n
 * @returns {string[]}
 */
class Solution {
  graycode(n) {
    let result = [];

    // Total number of Gray Codes = 2^n
    let total = 1 << n;

    // Generate Gray Code for every number
    for (let i = 0; i < total; i++) {
      // Gray Code formula
      let gray = i ^ (i >> 1);

      let binary = "";

      // Convert gray number into binary string of length n
      for (let bit = n - 1; bit >= 0; bit--) {
        if ((gray & (1 << bit)) !== 0) binary += "1";
        else binary += "0";
      }

      result.push(binary);
    }

    return result;
  }
}
