/**
 * @param {number} V
 * @param {number[][]} edges
 * @return {number}
 */

class Solution {
  secondMST(V, edges) {
    const E = edges.length;
    if (E === 0) return -1;

    // Edge list
    const arr = edges.map((e) => ({ u: e[0], v: e[1], w: e[2] }));

    // DSU implementation
    class DSU {
      constructor(n) {
        this.parent = Array(n);
        this.rank = Array(n).fill(0);
        for (let i = 0; i < n; i++) this.parent[i] = i;
      }
      find(x) {
        if (this.parent[x] === x) return x;
        this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
      }
      unite(a, b) {
        a = this.find(a);
        b = this.find(b);
        if (a === b) return false;
        if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
        this.parent[b] = a;
        if (this.rank[a] === this.rank[b]) this.rank[a]++;
        return true;
      }
    }

    // Sort by weight
    arr.sort((a, b) => a.w - b.w);

    // First MST
    const dsu = new DSU(V);
    let mstWeight = 0;
    const mstIndices = [];

    for (let i = 0; i < E; i++) {
      if (dsu.unite(arr[i].u, arr[i].v)) {
        mstWeight += arr[i].w;
        mstIndices.push(i);
      }
    }

    if (mstIndices.length !== V - 1) return -1;

    let best = Number.MAX_SAFE_INTEGER;

    // For each MST edge, ban it and rebuild MST
    for (const banned of mstIndices) {
      const d2 = new DSU(V);
      let curWeight = 0;
      let used = 0;

      for (let i = 0; i < E; i++) {
        if (i === banned) continue;

        if (d2.unite(arr[i].u, arr[i].v)) {
          curWeight += arr[i].w;
          used++;
          if (curWeight >= best) break;
        }
      }

      if (used === V - 1 && curWeight > mstWeight) {
        best = Math.min(best, curWeight);
      }
    }

    return best === Number.MAX_SAFE_INTEGER ? -1 : best;
  }
}
