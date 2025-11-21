/**
 * @param {number} V
 * @param {number} a
 * @param {number} b
 * @param {number[][]} edges  // each edge: [u, v, w1, w2]
 * @returns {number}
 *
 * We implement Dijkstra on 2-layer graph as explained.
 */
class Solution {
  shortestPath(V, a, b, edges) {
    const INF = Number.MAX_SAFE_INTEGER;
    const N = 2 * V;
    const adj = Array.from({ length: N }, () => []);
    for (const e of edges) {
      const u = e[0],
        v = e[1];
      const w1 = e[2],
        w2 = e[3];
      // straight edges (stay same layer)
      adj[u].push([v, w1]);
      adj[v].push([u, w1]);
      adj[u + V].push([v + V, w1]);
      adj[v + V].push([u + V, w1]);
      // curved edges (layer0 -> layer1)
      adj[u].push([v + V, w2]);
      adj[v].push([u + V, w2]);
    }

    // Min-heap implemented by array with push & re-sort (or use binary heap implementation).
    // For clarity and correctness we implement a small binary heap.
    class MinHeap {
      constructor() {
        this.heap = [];
      }
      push(item) {
        this.heap.push(item);
        this._siftUp();
      }
      pop() {
        if (!this.heap.length) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) {
          this.heap[0] = last;
          this._siftDown();
        }
        return top;
      }
      _siftUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
          let p = Math.floor((i - 1) / 2);
          if (this.heap[p][0] <= this.heap[i][0]) break;
          [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
          i = p;
        }
      }
      _siftDown() {
        let i = 0,
          n = this.heap.length;
        while (true) {
          let l = 2 * i + 1,
            r = 2 * i + 2,
            smallest = i;
          if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
          if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
          if (smallest === i) break;
          [this.heap[i], this.heap[smallest]] = [
            this.heap[smallest],
            this.heap[i],
          ];
          i = smallest;
        }
      }
      isEmpty() {
        return this.heap.length === 0;
      }
    }

    const dist = new Array(N).fill(INF);
    const heap = new MinHeap();
    dist[a] = 0;
    heap.push([0, a]);

    while (!heap.isEmpty()) {
      const top = heap.pop();
      const d = top[0],
        node = top[1];
      if (d !== dist[node]) continue;
      for (const [nxt, w] of adj[node]) {
        if (dist[nxt] > d + w) {
          dist[nxt] = d + w;
          heap.push([dist[nxt], nxt]);
        }
      }
    }

    const ans = Math.min(dist[b], dist[b + V]);
    return ans >= INF ? -1 : ans;
  }
}
