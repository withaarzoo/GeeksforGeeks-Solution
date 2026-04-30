/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number[]}
 */
class Solution {
  kthLargest(arr, k) {
    // JavaScript has no built-in heap, so I implement a simple min-heap
    const heap = [];
    const result = [];

    // push element into min-heap and bubble up to maintain heap property
    const push = (val) => {
      heap.push(val);
      let i = heap.length - 1;
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (heap[parent] > heap[i]) {
          // swap with parent if parent is larger (min-heap property)
          [heap[parent], heap[i]] = [heap[i], heap[parent]];
          i = parent;
        } else break;
      }
    };

    // remove and return the minimum element, then fix heap downward
    const pop = () => {
      const top = heap[0];
      const last = heap.pop();
      if (heap.length > 0) {
        heap[0] = last;
        let i = 0;
        while (true) {
          let smallest = i;
          const l = 2 * i + 1,
            r = 2 * i + 2;
          if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
          if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
          if (smallest === i) break;
          [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
          i = smallest;
        }
      }
      return top;
    };

    for (const num of arr) {
      push(num); // add new element to heap

      // if heap size exceeds k, remove the smallest
      // so heap always holds the k largest seen so far
      if (heap.length > k) pop();

      // fewer than k elements means kth largest doesn't exist yet
      if (heap.length < k) {
        result.push(-1);
      } else {
        result.push(heap[0]); // min of heap = kth largest
      }
    }

    return result;
  }
}
