/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @returns {number[]}
 */

class Solution {
  // First index >= target
  lowerBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
      let mid = Math.floor((low + high) / 2);

      if (arr[mid] < target) low = mid + 1;
      else high = mid;
    }

    return low;
  }

  // First index > target
  upperBound(arr, target) {
    let low = 0;
    let high = arr.length;

    while (low < high) {
      let mid = Math.floor((low + high) / 2);

      if (arr[mid] <= target) low = mid + 1;
      else high = mid;
    }

    return low;
  }

  freqInRange(arr, queries) {
    // Map value -> occurrence positions
    const mp = new Map();

    for (let i = 0; i < arr.length; i++) {
      if (!mp.has(arr[i])) {
        mp.set(arr[i], []);
      }

      mp.get(arr[i]).push(i);
    }

    const ans = [];

    for (const q of queries) {
      const [l, r, x] = q;

      // Value not present
      if (!mp.has(x)) {
        ans.push(0);
        continue;
      }

      const positions = mp.get(x);

      const left = this.lowerBound(positions, l);
      const right = this.upperBound(positions, r);

      ans.push(right - left);
    }

    return ans;
  }
}
