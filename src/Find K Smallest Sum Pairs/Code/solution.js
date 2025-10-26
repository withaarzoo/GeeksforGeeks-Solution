/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} k
 * @returns {number[][]}
 */
class Solution {
  kSmallestPair(arr1, arr2, k) {
    let res = [];
    let n1 = arr1.length,
      n2 = arr2.length;
    if (n1 === 0 || n2 === 0 || k === 0) return res;

    // Simple min-heap implementation
    class MinHeap {
      constructor() {
        this.data = [];
      }
      size() {
        return this.data.length;
      }
      push(val) {
        this.data.push(val);
        let i = this.data.length - 1;
        while (i > 0) {
          let p = Math.floor((i - 1) / 2);
          if (this.data[p][0] <= this.data[i][0]) break;
          [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
          i = p;
        }
      }
      pop() {
        if (this.data.length === 0) return null;
        const ret = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
          this.data[0] = last;
          let i = 0;
          while (true) {
            let l = 2 * i + 1,
              r = 2 * i + 2,
              smallest = i;
            if (
              l < this.data.length &&
              this.data[l][0] < this.data[smallest][0]
            )
              smallest = l;
            if (
              r < this.data.length &&
              this.data[r][0] < this.data[smallest][0]
            )
              smallest = r;
            if (smallest === i) break;
            [this.data[i], this.data[smallest]] = [
              this.data[smallest],
              this.data[i],
            ];
            i = smallest;
          }
        }
        return ret;
      }
    }

    const heap = new MinHeap();
    const limit = Math.min(n1, k);
    for (let i = 0; i < limit; ++i) {
      heap.push([arr1[i] + arr2[0], i, 0]); // [sum, i, j]
    }

    while (heap.size() > 0 && res.length < k) {
      const [sum, i, j] = heap.pop();
      res.push([arr1[i], arr2[j]]);
      if (j + 1 < n2) {
        heap.push([arr1[i] + arr2[j + 1], i, j + 1]);
      }
    }
    return res;
  }
}
