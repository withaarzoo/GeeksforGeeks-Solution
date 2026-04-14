/**
 * @param {string} s
 * @returns {string}
 */
class Solution {
  removeSpaces(s) {
    // String to store final result
    let result = "";

    // Traverse through each character
    for (let ch of s) {
      // Add only non-space characters
      if (ch !== " ") {
        result += ch;
      }
    }

    // Return final string
    return result;
  }
}
