// Implement a simple min-heap since JS doesn't have a built-in priority queue
class MinHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  swap(i, j) {
    [this.a[i], this.a[j]] = [this.a[j], this.a[i]];
  }
  push(val) {
    this.a.push(val);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.a[p] <= this.a[i]) break;
      this.swap(p, i);
      i = p;
    }
  }
  pop() {
    if (this.a.length === 0) return null;
    if (this.a.length === 1) return this.a.pop();
    const ret = this.a[0];
    this.a[0] = this.a.pop();
    let i = 0;
    while (true) {
      const l = 2 * i + 1,
        r = 2 * i + 2;
      let smallest = i;
      if (l < this.a.length && this.a[l] < this.a[smallest]) smallest = l;
      if (r < this.a.length && this.a[r] < this.a[smallest]) smallest = r;
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
    return ret;
  }
}

class Solution {
  minCost(arr) {
    if (!arr || arr.length <= 1) return 0;
    const heap = new MinHeap();
    for (const x of arr) heap.push(x);
    let total = 0;
    while (heap.size() > 1) {
      const a = heap.pop();
      const b = heap.pop();
      const s = a + b;
      total += s;
      heap.push(s);
    }
    return total;
  }
}
