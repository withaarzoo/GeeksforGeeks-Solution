/**
 * JavaScript implementation with a simple MaxHeap
 * @param {number[]} arr
 * @returns {number}
 */

class MaxHeap {
  constructor() {
    this.data = [];
  }
  size() {
    return this.data.length;
  }
  // swap helper
  swap(i, j) {
    const t = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = t;
  }
  // push value onto heap
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.data[p] >= this.data[i]) break;
      this.swap(p, i);
      i = p;
    }
  }
  // pop max
  pop() {
    if (this.data.length === 0) return null;
    const max = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      const n = this.data.length;
      while (true) {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let largest = i;
        if (l < n && this.data[l] > this.data[largest]) largest = l;
        if (r < n && this.data[r] > this.data[largest]) largest = r;
        if (largest === i) break;
        this.swap(i, largest);
        i = largest;
      }
    }
    return max;
  }
  peek() {
    return this.data.length ? this.data[0] : null;
  }
}

class Solution {
  minoperations(arr) {
    // Build a max-heap with doubles and compute total sum
    const heap = new MaxHeap();
    let sum = 0.0;
    for (const v of arr) {
      heap.push(v * 1.0);
      sum += v;
    }
    const target = sum / 2.0;
    let ops = 0;
    while (sum > target) {
      const top = heap.pop();
      const half = top / 2.0;
      sum -= top - half; // reduce the running sum
      heap.push(half);
      ops += 1;
    }
    return ops;
  }
}

// Example usage:
// const s = new Solution();
// console.log(s.minoperations([5, 19, 8, 1]));
