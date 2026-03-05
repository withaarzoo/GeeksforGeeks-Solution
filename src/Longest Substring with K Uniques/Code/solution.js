class Solution {
  longestKSubstr(s, k) {
    let map = new Map();
    let left = 0;
    let maxLen = -1;

    for (let right = 0; right < s.length; right++) {
      let char = s[right];
      map.set(char, (map.get(char) || 0) + 1);

      // Shrink window if unique characters exceed k
      while (map.size > k) {
        let leftChar = s[left];
        map.set(leftChar, map.get(leftChar) - 1);

        if (map.get(leftChar) === 0) {
          map.delete(leftChar);
        }

        left++;
      }

      // If exactly k unique characters
      if (map.size === k) {
        maxLen = Math.max(maxLen, right - left + 1);
      }
    }

    return maxLen;
  }
}
