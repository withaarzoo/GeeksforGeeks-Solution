/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
class Solution {
  maxSubarrSum(arr, a, b) {
    const n = arr.length;
    if (n === 0) return 0;

    // prefix sums
    const prefix = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; ++i) prefix[i] = prefix[i - 1] + arr[i - 1];

    // deque implemented with array and head pointer for O(1) amortized front pop
    const dq = [];
    let head = 0;
    let ans = Number.NEGATIVE_INFINITY;

    for (let r = 1; r <= n; ++r) {
      const leftBound = Math.max(0, r - b);
      const newIdx = r - a;

      // pop front while out of window
      while (head < dq.length && dq[head] < leftBound) head++;

      // add new index (if valid) maintaining increasing prefix values
      if (newIdx >= 0) {
        while (
          head < dq.length &&
          prefix[dq[dq.length - 1]] >= prefix[newIdx]
        ) {
          dq.pop();
        }
        dq.push(newIdx);
      }

      if (head < dq.length) {
        const candidate = prefix[r] - prefix[dq[head]];
        if (candidate > ans) ans = candidate;
      }
    }

    return ans;
  }
}
