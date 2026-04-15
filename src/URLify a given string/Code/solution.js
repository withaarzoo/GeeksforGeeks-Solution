/**
 * @param {String} s
 * @returns {String}
 */
class Solution {
  URLify(s) {
    // Store final answer
    let result = "";

    // Traverse every character
    for (let ch of s) {
      // Replace space with %20
      if (ch === " ") {
        result += "%20";
      } else {
        result += ch;
      }
    }

    // Return final modified string
    return result;
  }
}
