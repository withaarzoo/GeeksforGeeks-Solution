class Solution {
  processQueries(arr, queries) {
    const n = arr.length;

    // up[i] = farthest index reachable while non-decreasing
    const up = new Array(n);

    // down[i] = farthest index reachable while non-increasing
    const down = new Array(n);

    // Last element
    up[n - 1] = n - 1;

    // Build non-decreasing reach array
    for (let i = n - 2; i >= 0; i--) {
      if (arr[i] <= arr[i + 1]) up[i] = up[i + 1];
      else up[i] = i;
    }

    // Last element
    down[n - 1] = n - 1;

    // Build non-increasing reach array
    for (let i = n - 2; i >= 0; i--) {
      if (arr[i] >= arr[i + 1]) down[i] = down[i + 1];
      else down[i] = i;
    }

    const ans = [];

    // Answer every query
    for (const q of queries) {
      const l = q[0];
      const r = q[1];

      // End of increasing part
      const peak = up[l];

      // Entire range is non-decreasing
      if (peak >= r) ans.push(true);
      // Otherwise check decreasing part
      else ans.push(down[peak] >= r);
    }

    return ans;
  }
}
