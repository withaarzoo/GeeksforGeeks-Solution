/**
 * @param {number} n
 * @returns {number}
 */
class Solution {
  countStrings(n) {
    // Strings of length 1:
    // "0" -> ends with 0
    // "1" -> ends with 1
    let endWith0 = 1;
    let endWith1 = 1;

    // Build answer for lengths from 2 to n
    for (let i = 2; i <= n; i++) {
      let newEndWith0 = endWith0 + endWith1;
      let newEndWith1 = endWith0;

      endWith0 = newEndWith0;
      endWith1 = newEndWith1;
    }

    return endWith0 + endWith1;
  }
}
