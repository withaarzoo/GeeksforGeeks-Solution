/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {boolean}
 */

class Solution {
  isPossible(arr, k) {
    // If array may not be sorted, sort it
    arr.sort((a, b) => a - b);

    // We'll implement a min-heap via a binary heap for pairs [value, length].
    // Comparator: smaller value first; if equal value then smaller length first.
    class MinHeap {
      constructor() {
        this.a = [];
      }
      compare(i, j) {
        let A = this.a[i],
          B = this.a[j];
        if (A[0] !== B[0]) return A[0] < B[0];
        return A[1] < B[1];
      }
      swap(i, j) {
        [this.a[i], this.a[j]] = [this.a[j], this.a[i]];
      }
      push(x) {
        this.a.push(x);
        let i = this.a.length - 1;
        while (i > 0) {
          let p = Math.floor((i - 1) / 2);
          if (this.compare(i, p)) {
            this.swap(i, p);
            i = p;
          } else break;
        }
      }
      pop() {
        if (this.a.length === 0) return null;
        let ret = this.a[0];
        if (this.a.length === 1) {
          this.a.pop();
          return ret;
        }
        this.a[0] = this.a.pop();
        let i = 0,
          n = this.a.length;
        while (true) {
          let l = 2 * i + 1,
            r = 2 * i + 2,
            smallest = i;
          if (l < n && this.compare(l, smallest)) smallest = l;
          if (r < n && this.compare(r, smallest)) smallest = r;
          if (smallest !== i) {
            this.swap(i, smallest);
            i = smallest;
          } else break;
        }
        return ret;
      }
      peek() {
        return this.a.length ? this.a[0] : null;
      }
      isEmpty() {
        return this.a.length === 0;
      }
    }

    const pq = new MinHeap();
    let i = 0,
      n = arr.length;
    while (i < n) {
      if (pq.isEmpty()) {
        pq.push([arr[i], 1]);
        i++;
      } else {
        let top = pq.peek();
        if (arr[i] === top[0]) {
          pq.push([arr[i], 1]);
          i++;
        } else if (arr[i] === top[0] + 1) {
          pq.pop();
          pq.push([arr[i], top[1] + 1]);
          i++;
        } else {
          // arr[i] > top[0] + 1
          if (top[1] < k) return false;
          pq.pop();
        }
      }
    }

    while (!pq.isEmpty()) {
      let t = pq.pop();
      if (t[1] < k) return false;
    }
    return true;
  }
}
