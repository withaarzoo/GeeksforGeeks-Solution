class Solution {
  minWindow(s, p) {
    let freqP = new Array(256).fill(0);
    let window = new Array(256).fill(0);

    for (let c of p) freqP[c.charCodeAt(0)]++;

    let left = 0,
      right = 0;
    let count = 0;
    let minLen = Infinity;
    let start = 0;

    while (right < s.length) {
      let c = s.charCodeAt(right);
      window[c]++;

      if (freqP[c] !== 0 && window[c] <= freqP[c]) count++;

      while (count === p.length) {
        if (right - left + 1 < minLen) {
          minLen = right - left + 1;
          start = left;
        }

        let leftChar = s.charCodeAt(left);
        window[leftChar]--;

        if (freqP[leftChar] !== 0 && window[leftChar] < freqP[leftChar])
          count--;

        left++;
      }

      right++;
    }

    if (minLen === Infinity) return "";

    return s.substring(start, start + minLen);
  }
}
