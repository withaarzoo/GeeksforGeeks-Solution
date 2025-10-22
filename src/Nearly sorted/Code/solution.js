/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {void} (modifies arr in-place)
 */
class MinHeap {
  constructor() {
    this.data = [];
  }
  size() {
    return this.data.length;
  }
  peek() {
    return this.data[0];
  }
  swap(i, j) {
    const t = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = t;
  }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      this.swap(p, i);
      i = p;
    }
  }
  pop() {
    if (this.data.length === 0) return undefined;
    const ret = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let l = 2 * i + 1,
          r = 2 * i + 2,
          smallest = i;
        if (l < this.data.length && this.data[l] < this.data[smallest])
          smallest = l;
        if (r < this.data.length && this.data[r] < this.data[smallest])
          smallest = r;
        if (smallest === i) break;
        this.swap(i, smallest);
        i = smallest;
      }
    }
    return ret;
  }
}

class Solution {
  nearlySorted(arr, k) {
    const n = arr.length;
    if (n <= 1 || k <= 0) return;

    const heap = new MinHeap();
    // push first k+1 elements
    for (let i = 0; i < n && i <= k; ++i) heap.push(arr[i]);

    let idx = 0;
    for (let i = k + 1; i < n; ++i) {
      arr[idx++] = heap.pop();
      heap.push(arr[i]);
    }
    // empty remaining heap
    while (heap.size() > 0) arr[idx++] = heap.pop();
  }
}
