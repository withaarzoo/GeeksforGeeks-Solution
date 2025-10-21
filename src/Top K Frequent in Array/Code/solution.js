/**
 * @param {Number[]} arr
 * @param {Number} k
 * @returns {Number[]}
 */

class Solution {
  topKFreq(arr, k) {
    // frequency map
    const freq = new Map();
    for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);

    // Convert to array of [value, frequency]
    const entries = Array.from(freq.entries()); // [value, freq]

    // Sort by frequency descending, then value descending
    entries.sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]; // higher freq first
      return b[0] - a[0]; // if tie, larger value first
    });

    // pick top k values
    const result = [];
    for (let i = 0; i < k; ++i) result.push(entries[i][0]);
    return result;
  }
}
