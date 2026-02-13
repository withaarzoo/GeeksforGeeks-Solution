class Solution {
  // Function to compute digit sum
  digitSum(x) {
    let sum = 0;
    while (x > 0) {
      sum += x % 10;
      x = Math.floor(x / 10);
    }
    return sum;
  }

  getCount(n, d) {
    let left = 1,
      right = n;
    let ans = -1;

    // Binary Search
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (mid - this.digitSum(mid) >= d) {
        ans = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (ans === -1) return 0;

    return n - ans + 1;
  }
}
