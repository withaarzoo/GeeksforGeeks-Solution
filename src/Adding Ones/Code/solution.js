/**
 * @param {number} n
 * @param {number[]} updates
 * @return {number[]}
 */
class Solution {
  update(n, updates) {
    let arr = new Array(n).fill(0);
    for (let j of updates) {
      arr[j - 1]++;
    }
    for (let i = 1; i < n; i++) {
      arr[i] += arr[i - 1];
    }
    return arr;
  }
}
