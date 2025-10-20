/**
 * @param {number[]} arr
 * @return {number[]}
 *
 * I compute Catalan numbers via DP, then map each value to its sorted index
 * (which equals how many elements are smaller). Result = Catalan[left]*Catalan[right].
 */
class Solution {
  countBSTs(arr) {
    const n = arr.length;
    const ans = new Array(n).fill(0);
    if (n === 0) return ans;

    // 1) Catalan DP
    const catalan = new Array(n + 1).fill(0);
    catalan[0] = 1;
    for (let i = 1; i <= n; ++i) {
      let sum = 0n; // use BigInt to be safe for multiplication
      for (let j = 0; j < i; ++j) {
        sum += BigInt(catalan[j]) * BigInt(catalan[i - 1 - j]);
      }
      catalan[i] = Number(sum); // safe for small n
    }

    // 2) rank mapping using sorted copy
    const sorted = Array.from(arr).sort((a, b) => a - b);
    const rank = new Map();
    for (let i = 0; i < n; ++i) rank.set(sorted[i], i);

    // 3) compute answers
    for (let i = 0; i < n; ++i) {
      const left = rank.get(arr[i]);
      const right = n - 1 - left;
      ans[i] = catalan[left] * catalan[right];
    }
    return ans;
  }
}
