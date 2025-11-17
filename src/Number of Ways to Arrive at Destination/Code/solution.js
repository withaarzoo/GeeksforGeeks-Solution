/**
 * Count number of shortest paths from node 0 to node V-1 in a weighted undirected graph.
 * @param {number} V
 * @param {number[][]} edges  // each edge: [u,v,w]
 * @returns {number}
 *
 * We'll include a small binary min-heap implementation for efficiency.
 */

class MinHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  push(item) {
    this.a.push(item);
    let i = this.a.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.a[p][0] <= this.a[i][0]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  pop() {
    if (this.a.length === 0) return null;
    const res = this.a[0];
    const last = this.a.pop();
    if (this.a.length > 0) {
      this.a[0] = last;
      let i = 0;
      while (true) {
        let l = 2 * i + 1,
          r = 2 * i + 2,
          smallest = i;
        if (l < this.a.length && this.a[l][0] < this.a[smallest][0])
          smallest = l;
        if (r < this.a.length && this.a[r][0] < this.a[smallest][0])
          smallest = r;
        if (smallest === i) break;
        [this.a[i], this.a[smallest]] = [this.a[smallest], this.a[i]];
        i = smallest;
      }
    }
    return res;
  }
}

class Solution {
  countPaths(V, edges) {
    const MOD = 1e9 + 7;
    const INF = Number.POSITIVE_INFINITY;
    const adj = Array.from({ length: V }, () => []);
    for (let e of edges) {
      const u = e[0],
        v = e[1],
        w = e[2];
      adj[u].push([v, w]);
      adj[v].push([u, w]); // undirected
    }
    const dist = new Array(V).fill(Infinity);
    const ways = new Array(V).fill(0);
    const pq = new MinHeap();
    dist[0] = 0;
    ways[0] = 1;
    pq.push([0, 0]); // [distance, node]
    while (pq.size() > 0) {
      const cur = pq.pop();
      if (!cur) break;
      const d = cur[0],
        node = cur[1];
      if (d > dist[node]) continue;
      for (const [nei, w] of adj[node]) {
        const nd = d + w;
        if (nd < dist[nei]) {
          dist[nei] = nd;
          ways[nei] = ways[node];
          pq.push([nd, nei]);
        } else if (nd === dist[nei]) {
          ways[nei] = (ways[nei] + ways[node]) % MOD;
        }
      }
    }
    return ways[V - 1] % MOD;
  }
}
