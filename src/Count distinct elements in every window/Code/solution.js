class Solution {
  countDistinct(arr, k) {
    let freq = new Map();
    let result = [];

    // First window
    for (let i = 0; i < k; i++) {
      freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
    }

    result.push(freq.size);

    // Sliding window
    for (let i = k; i < arr.length; i++) {
      let out = arr[i - k];
      freq.set(out, freq.get(out) - 1);
      if (freq.get(out) === 0) {
        freq.delete(out);
      }

      let incoming = arr[i];
      freq.set(incoming, (freq.get(incoming) || 0) + 1);

      result.push(freq.size);
    }

    return result;
  }
}
