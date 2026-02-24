class Solution {
  equalSumSpan(a1, a2) {
    let n = a1.length;
    let map = new Map();
    let prefixSum = 0;
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
      prefixSum += a1[i] - a2[i];

      if (prefixSum === 0) {
        maxLen = i + 1;
      }

      if (map.has(prefixSum)) {
        maxLen = Math.max(maxLen, i - map.get(prefixSum));
      } else {
        map.set(prefixSum, i);
      }
    }

    return maxLen;
  }
}
