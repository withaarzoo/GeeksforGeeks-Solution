/**
 * @param {number[][]} stones
 * @returns {number}
 */

// Optimised DSU for GFG JS: iterative find + plain objects
class DSU {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) this.parent[i] = i;
  }

  // Iterative find with path compression (no recursion -> faster in JS)
  find(x) {
    const parent = this.parent;
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path halving
      x = parent[x];
    }
    return x;
  }

  unite(a, b) {
    let pa = this.find(a);
    let pb = this.find(b);
    if (pa === pb) return;

    const rank = this.rank;
    if (rank[pa] < rank[pb]) {
      this.parent[pa] = pb;
    } else if (rank[pb] < rank[pa]) {
      this.parent[pb] = pa;
    } else {
      this.parent[pb] = pa;
      rank[pa]++;
    }
  }
}

class Solution {
  maxRemove(stones) {
    const n = stones.length;
    const dsu = new DSU(n);

    // Using plain objects is slightly faster than Map in GFG JS
    const rowRep = Object.create(null);
    const colRep = Object.create(null);

    for (let i = 0; i < n; i++) {
      const r = stones[i][0];
      const c = stones[i][1];

      if (rowRep[r] !== undefined) {
        dsu.unite(i, rowRep[r]);
      } else {
        rowRep[r] = i;
      }

      if (colRep[c] !== undefined) {
        dsu.unite(i, colRep[c]);
      } else {
        colRep[c] = i;
      }
    }

    let components = 0;
    for (let i = 0; i < n; i++) {
      if (dsu.find(i) === i) components++;
    }

    return n - components;
  }
}
