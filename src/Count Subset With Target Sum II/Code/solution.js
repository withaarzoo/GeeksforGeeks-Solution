class Solution {
  countSubset(arr, k) {
    const n = arr.length;
    const mid = Math.floor(n / 2);

    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const leftSums = [];
    const rightSums = [];

    // Left subset sums
    for (let mask = 0; mask < 1 << left.length; mask++) {
      let sum = 0;
      for (let i = 0; i < left.length; i++) {
        if (mask & (1 << i)) sum += left[i];
      }
      leftSums.push(sum);
    }

    // Right subset sums
    for (let mask = 0; mask < 1 << right.length; mask++) {
      let sum = 0;
      for (let i = 0; i < right.length; i++) {
        if (mask & (1 << i)) sum += right[i];
      }
      rightSums.push(sum);
    }

    const freq = new Map();
    for (let s of rightSums) freq.set(s, (freq.get(s) || 0) + 1);

    let count = 0;
    for (let s of leftSums) {
      const need = k - s;
      count += freq.get(need) || 0;
    }

    return count;
  }
}
