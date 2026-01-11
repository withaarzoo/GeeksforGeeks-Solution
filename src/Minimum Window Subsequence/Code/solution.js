class Solution {
  minWindow(s1, s2) {
    let n = s1.length,
      m = s2.length;
    let minLen = Infinity;
    let start = -1;

    for (let i = 0; i < n; i++) {
      if (s1[i] !== s2[0]) continue;

      let p1 = i,
        p2 = 0;

      // Forward scan
      while (p1 < n && p2 < m) {
        if (s1[p1] === s2[p2]) p2++;
        p1++;
      }

      if (p2 === m) {
        let end = p1 - 1;

        // Backward shrink
        p2 = m - 1;
        while (p2 >= 0) {
          if (s1[end] === s2[p2]) p2--;
          end--;
        }
        end++;

        if (p1 - end < minLen) {
          minLen = p1 - end;
          start = end;
        }
      }
    }

    return start === -1 ? "" : s1.substring(start, start + minLen);
  }
}
