/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

class Solution {
  maxAmount(arr, k) {
    // Modulo value
    const MOD = 1000000007;

    // Simple Max Heap implementation
    class MaxHeap {
      constructor() {
        this.heap = [];
      }

      // Insert a new value
      push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;

        while (i > 0) {
          let p = Math.floor((i - 1) / 2);
          if (this.heap[p] >= this.heap[i]) break;

          [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
          i = p;
        }
      }

      // Remove and return maximum value
      pop() {
        if (this.heap.length === 1) return this.heap.pop();

        let top = this.heap[0];
        this.heap[0] = this.heap.pop();

        let i = 0;

        while (true) {
          let left = 2 * i + 1;
          let right = 2 * i + 2;
          let largest = i;

          if (left < this.heap.length && this.heap[left] > this.heap[largest])
            largest = left;

          if (right < this.heap.length && this.heap[right] > this.heap[largest])
            largest = right;

          if (largest === i) break;

          [this.heap[i], this.heap[largest]] = [
            this.heap[largest],
            this.heap[i],
          ];
          i = largest;
        }

        return top;
      }

      // Return heap size
      size() {
        return this.heap.length;
      }
    }

    const heap = new MaxHeap();

    // Insert all sellers
    for (let x of arr) {
      if (x > 0) heap.push(x);
    }

    let ans = 0;

    // Sell at most k tickets
    while (k > 0 && heap.size() > 0) {
      // Seller with maximum tickets
      let cur = heap.pop();

      // Add current ticket price
      ans = (ans + cur) % MOD;

      // One ticket sold
      cur--;

      // Insert back if tickets remain
      if (cur > 0) heap.push(cur);

      k--;
    }

    return ans;
  }
}
