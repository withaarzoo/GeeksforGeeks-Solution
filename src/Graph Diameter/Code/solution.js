/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */

class Solution {
  // BFS to collect component nodes and return farthest node
  bfsCollect(start, adj) {
    const n = adj.length;
    const dist = new Array(n).fill(-1);
    const q = [];
    let qi = 0;
    q.push(start);
    dist[start] = 0;
    let farthest = start;
    const comp = [];
    while (qi < q.length) {
      const u = q[qi++];
      comp.push(u);
      if (dist[u] > dist[farthest]) farthest = u;
      for (const v of adj[u]) {
        if (dist[v] === -1) {
          dist[v] = dist[u] + 1;
          q.push(v);
        }
      }
    }
    return { farthest, comp };
  }

  // BFS from src to get maximum distance
  bfsMaxDist(src, adj) {
    const n = adj.length;
    const dist = new Array(n).fill(-1);
    const q = [];
    let qi = 0;
    q.push(src);
    dist[src] = 0;
    let maxd = 0;
    while (qi < q.length) {
      const u = q[qi++];
      maxd = Math.max(maxd, dist[u]);
      for (const v of adj[u]) {
        if (dist[v] === -1) {
          dist[v] = dist[u] + 1;
          q.push(v);
        }
      }
    }
    return maxd;
  }

  diameter(V, edges) {
    if (V <= 1) return 0;
    const adj = Array.from({ length: V }, () => []);
    for (const e of edges) {
      const a = e[0],
        b = e[1];
      adj[a].push(b);
      adj[b].push(a);
    }
    const processed = new Array(V).fill(false);
    let answer = 0;
    for (let i = 0; i < V; ++i) {
      if (processed[i]) continue;
      const { farthest: u, comp } = this.bfsCollect(i, adj);
      for (const node of comp) processed[node] = true;
      const compDiam = this.bfsMaxDist(u, adj);
      answer = Math.max(answer, compDiam);
    }
    return answer;
  }
}
