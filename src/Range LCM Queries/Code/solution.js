/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number []}
 */

class Solution {
  // Function to calculate GCD
  gcd(a, b) {
    while (b !== 0) {
      let temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  }

  // Function to calculate LCM
  lcm(a, b) {
    return (a / this.gcd(a, b)) * b;
  }

  // Build segment tree
  build(idx, low, high, arr) {
    // Leaf node
    if (low === high) {
      this.seg[idx] = arr[low];
      return;
    }

    let mid = Math.floor((low + high) / 2);

    this.build(2 * idx + 1, low, mid, arr);
    this.build(2 * idx + 2, mid + 1, high, arr);

    // Store LCM
    this.seg[idx] = this.lcm(this.seg[2 * idx + 1], this.seg[2 * idx + 2]);
  }

  // Update function
  update(idx, low, high, pos, val) {
    if (low === high) {
      this.seg[idx] = val;
      return;
    }

    let mid = Math.floor((low + high) / 2);

    if (pos <= mid) this.update(2 * idx + 1, low, mid, pos, val);
    else this.update(2 * idx + 2, mid + 1, high, pos, val);

    // Recalculate node
    this.seg[idx] = this.lcm(this.seg[2 * idx + 1], this.seg[2 * idx + 2]);
  }

  // Query function
  query(idx, low, high, l, r) {
    // Outside range
    if (high < l || low > r) return 1;

    // Completely inside
    if (low >= l && high <= r) return this.seg[idx];

    let mid = Math.floor((low + high) / 2);

    let left = this.query(2 * idx + 1, low, mid, l, r);
    let right = this.query(2 * idx + 2, mid + 1, high, l, r);

    return this.lcm(left, right);
  }

  RangeLCMQuery(arr, queries) {
    let n = arr.length;

    // Create segment tree
    this.seg = new Array(4 * n).fill(1);

    // Build tree
    this.build(0, 0, n - 1, arr);

    let ans = [];

    // Process queries
    for (let q of queries) {
      // Update query
      if (q[0] === 1) {
        this.update(0, 0, n - 1, q[1], q[2]);
      }

      // Range query
      else {
        ans.push(this.query(0, 0, n - 1, q[1], q[2]));
      }
    }

    return ans;
  }
}
