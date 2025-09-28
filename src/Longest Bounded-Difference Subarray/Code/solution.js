/**
 * @param {number[]} arr
 * @param {number} x
 * @returns {number[]}
 */
class Solution {
  longestSubarray(arr, x) {
    const n = arr.length;
    if (n === 0) return [];
    const maxD = []; // store indices, decreasing order by value
    const minD = []; // store indices, increasing order by value
    let l = 0,
      bestL = 0,
      bestLen = 0;

    for (let r = 0; r < n; r++) {
      while (maxD.length && arr[r] > arr[maxD[maxD.length - 1]]) maxD.pop();
      maxD.push(r);

      while (minD.length && arr[r] < arr[minD[minD.length - 1]]) minD.pop();
      minD.push(r);

      while (maxD.length && minD.length && arr[maxD[0]] - arr[minD[0]] > x) {
        if (maxD[0] === l) maxD.shift();
        if (minD[0] === l) minD.shift();
        l++;
      }

      const len = r - l + 1;
      if (len > bestLen) {
        bestLen = len;
        bestL = l;
      }
    }

    return arr.slice(bestL, bestL + bestLen);
  }
}
