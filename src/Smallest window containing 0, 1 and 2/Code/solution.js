/**
 * @param {string} s
 * @returns {number}
 */
class Solution {
  smallestSubstring(s) {
    let n = s.length;
    let count = [0, 0, 0];

    let left = 0;
    let ans = Infinity;

    for (let right = 0; right < n; right++) {
      count[s[right] - "0"]++;

      while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
        ans = Math.min(ans, right - left + 1);

        count[s[left] - "0"]--;
        left++;
      }
    }

    return ans === Infinity ? -1 : ans;
  }
}
