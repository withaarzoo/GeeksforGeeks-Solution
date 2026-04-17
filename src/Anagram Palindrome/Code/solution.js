/**
 * @param {string} s
 * @returns {boolean}
 */
class Solution {
  canFormPalindrome(s) {
    // Frequency array for 26 lowercase letters
    let freq = new Array(26).fill(0);

    // Count frequency of each character
    for (let ch of s) {
      freq[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    // Count characters with odd frequency
    let oddCount = 0;

    for (let i = 0; i < 26; i++) {
      if (freq[i] % 2 !== 0) {
        oddCount++;
      }

      // More than one odd count means impossible
      if (oddCount > 1) {
        return false;
      }
    }

    return true;
  }
}
