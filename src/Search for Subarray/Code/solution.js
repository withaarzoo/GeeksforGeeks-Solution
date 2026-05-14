/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */

class Solution {
  // Function to build LPS array
  buildLPS(b) {
    const m = b.length;

    // Create LPS array filled with 0
    const lps = new Array(m).fill(0);

    // Length of previous longest prefix suffix
    let len = 0;

    let i = 1;

    while (i < m) {
      // Matching elements
      if (b[i] === b[len]) {
        len++;

        lps[i] = len;

        i++;
      } else {
        // Try smaller prefix
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;

          i++;
        }
      }
    }

    return lps;
  }

  search(a, b) {
    const n = a.length;
    const m = b.length;

    // Build LPS array
    const lps = this.buildLPS(b);

    // Store answer
    const ans = [];

    let i = 0;
    let j = 0;

    while (i < n) {
      // Elements match
      if (a[i] === b[j]) {
        i++;
        j++;
      }

      // Full pattern matched
      if (j === m) {
        ans.push(i - m);

        // Continue searching
        j = lps[j - 1];
      }

      // Mismatch
      else if (i < n && a[i] !== b[j]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }

    return ans;
  }
}
