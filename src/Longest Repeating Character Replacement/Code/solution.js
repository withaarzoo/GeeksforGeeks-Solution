class Solution {
  longestSubstr(s, k) {
    let freq = new Array(26).fill(0);
    let left = 0,
      maxFreq = 0,
      maxLen = 0;

    for (let right = 0; right < s.length; right++) {
      freq[s.charCodeAt(right) - 65]++;

      maxFreq = Math.max(maxFreq, freq[s.charCodeAt(right) - 65]);

      while (right - left + 1 - maxFreq > k) {
        freq[s.charCodeAt(left) - 65]--;
        left++;
      }

      maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
  }
}
