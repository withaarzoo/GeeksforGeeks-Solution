/**
 * @param {string} s
 * @return {string}
 */

class Solution {
  compress(s) {
    const n = s.length; // Store the string length for index calculations.

    const pi = new Array(n).fill(0); // pi[i] stores the longest prefix-suffix length.

    // Build the KMP prefix-function array in O(n).
    for (let i = 1; i < n; i++) {
      let j = pi[i - 1]; // Start with the previous longest matching prefix.

      // Fall back through the KMP prefix links when characters differ.
      while (j > 0 && s[i] !== s[j]) {
        j = pi[j - 1]; // Try the next smaller possible prefix.
      }

      // Extend the prefix when the current characters match.
      if (s[i] === s[j]) {
        j++;
      }

      pi[i] = j; // Save the longest prefix-suffix length for this position.
    }

    const ans = []; // Use an array so building the result stays efficient.

    let i = n - 1; // Start scanning from the last character.

    // Process the string from right to left.
    while (i >= 0) {
      const len = i + 1; // Length of the current prefix.

      // Compression is possible only for an even-length prefix.
      if (len % 2 === 0) {
        const period = len - pi[i]; // Smallest repeating period from KMP.

        // Check whether this prefix can be represented using '*'.
        if (pi[i] >= len / 2 && len % (2 * period) === 0) {
          ans.push("*"); // Store the compression symbol.

          // Skip the part represented by the repeated prefix.
          i = Math.floor(len / 2) - 1;

          continue; // Continue processing the remaining prefix.
        }
      }

      ans.push(s[i]); // Keep this character when no compression is possible.
      i--; // Move one position to the left.
    }

    ans.reverse(); // The result was constructed from right to left.

    return ans.join(""); // Convert the character array into the final string.
  }
}
