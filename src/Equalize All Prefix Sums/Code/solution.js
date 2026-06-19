class Solution {
  optimalArray(arr) {
    const n = arr.length;

    // Prefix sums
    const pref = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + arr[i];
    }

    const ans = [];

    for (let i = 0; i < n; i++) {
      // Median index in current prefix
      const mid = Math.floor(i / 2);

      const median = arr[mid];

      // Cost for left side
      const leftCost = median * (mid + 1) - pref[mid + 1];

      // Cost for right side
      const rightCost = pref[i + 1] - pref[mid + 1] - median * (i - mid);

      ans.push(leftCost + rightCost);
    }

    return ans;
  }
}
