/**
 * @param {String} s1
 * @param {String} s2
 * @returns {number}
 */

class Solution {
  transform(s1, s2) {
    // Store the common string length after checking both strings.
    const n = s1.length;

    // Moving a character does not change string length,
    // so strings with different lengths cannot be transformed.
    if (n !== s2.length) {
      return -1;
    }

    // Use a fixed-size array to compare character frequencies.
    // The array size is constant, so the extra space is O(1).
    const freq = new Array(256).fill(0);

    // Add frequencies from s1 and subtract frequencies from s2.
    // Matching character counts will leave every value equal to zero.
    for (let i = 0; i < n; i++) {
      freq[s1.charCodeAt(i)]++;
      freq[s2.charCodeAt(i)]--;
    }

    // Check whether both strings contain the same characters
    // with exactly the same frequencies.
    for (let i = 0; i < 256; i++) {
      if (freq[i] !== 0) {
        return -1;
      }
    }

    // Start from the end because characters that stay untouched
    // preserve their order and form the final suffix.
    let i = n - 1;
    let j = n - 1;
    let operations = 0;

    // Match s2 from right to left.
    while (i >= 0 && j >= 0) {
      // A matching character can remain in its current relative position.
      if (s1[i] === s2[j]) {
        i--;
        j--;
      } else {
        // A mismatching character from s1 must be moved to the front.
        operations++;
        i--;
      }
    }

    // Return the minimum number of moves.
    return operations;
  }
}
