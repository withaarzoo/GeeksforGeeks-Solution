/**
 * I implement a small max-heap (binary heap) to keep at most k elements.
 * Each heap node: {dist: number, point: [x,y]}.
 * This avoids sorting the whole array and runs in O(n log k).
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
class Solution {
  // helper: compute squared distance
  _dist2(pt) {
    return pt[0] * pt[0] + pt[1] * pt[1];
  }

  // max-heap implementation for objects with key `dist`
  _heapPush(heap, node) {
    heap.push(node);
    let i = heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (heap[parent].dist >= heap[i].dist) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  _heapPop(heap) {
    if (heap.length === 0) return null;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      // sift down
      let i = 0,
        n = heap.length;
      while (true) {
        let left = 2 * i + 1,
          right = 2 * i + 2,
          largest = i;
        if (left < n && heap[left].dist > heap[largest].dist) largest = left;
        if (right < n && heap[right].dist > heap[largest].dist) largest = right;
        if (largest === i) break;
        [heap[i], heap[largest]] = [heap[largest], heap[i]];
        i = largest;
      }
    }
    return top;
  }

  kClosest(points, k) {
    const heap = []; // max-heap
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const d = this._dist2(p);
      this._heapPush(heap, { dist: d, point: p });
      if (heap.length > k) this._heapPop(heap);
    }
    const res = [];
    while (heap.length > 0) {
      res.push(this._heapPop(heap).point);
    }
    return res; // order arbitrary
  }
}
