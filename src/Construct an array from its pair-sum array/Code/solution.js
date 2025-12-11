class Solution {
  // arr is an array of numbers (pair-sums)
  constructArr(arr) {
    const m = arr.length;
    const disc = 1 + 8 * m;
    const sq = Math.floor(Math.sqrt(disc));
    const n = Math.floor((1 + sq) / 2);

    if (n < 2) return [];

    if (n === 2) {
      // only one sum, return one valid pair [s, 0]
      return [arr[0], 0];
    }

    const s01 = arr[0];
    const s02 = arr[1];
    const s12 = arr[n - 1];

    const res0 = Math.floor((s01 + s02 - s12) / 2);

    const res = new Array(n);
    res[0] = res0;
    for (let i = 1; i < n; ++i) {
      res[i] = arr[i - 1] - res0; // arr[i-1] = res0 + res[i]
    }
    return res;
  }
}
