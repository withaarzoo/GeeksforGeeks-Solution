class Solution {
  minSwaps(arr) {
    let n = arr.length;

    // Count total 1s
    let k = 0;
    for (let x of arr) {
      if (x === 1) k++;
    }

    if (k === 0) return -1;

    let ones = 0;

    // First window
    for (let i = 0; i < k; i++) {
      if (arr[i] === 1) ones++;
    }

    let maxOnes = ones;

    // Sliding window
    for (let i = k; i < n; i++) {
      if (arr[i] === 1) ones++;
      if (arr[i - k] === 1) ones--;

      maxOnes = Math.max(maxOnes, ones);
    }

    return k - maxOnes;
  }
}
