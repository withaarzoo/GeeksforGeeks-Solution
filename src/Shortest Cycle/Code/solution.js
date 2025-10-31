/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
  shortCycle(V, edges) {
    // build adjacency list
    const adj = Array.from({ length: V }, () => []);
    for (const e of edges) {
      const u = e[0],
        v = e[1];
      adj[u].push(v);
      adj[v].push(u);
    }

    let ans = Number.MAX_SAFE_INTEGER;

    // BFS from each node
    for (let s = 0; s < V; ++s) {
      const dist = new Array(V).fill(-1);
      const parent = new Array(V).fill(-1);

      // simple queue with head index to avoid O(n) shift
      const q = [];
      let head = 0;
      dist[s] = 0;
      q.push(s);

      while (head < q.length) {
        const u = q[head++];
        for (const v of adj[u]) {
          if (dist[v] === -1) {
            dist[v] = dist[u] + 1;
            parent[v] = u;
            q.push(v);
          } else if (parent[u] !== v) {
            // found cycle
            const cycleLen = dist[u] + dist[v] + 1;
            if (cycleLen < ans) ans = cycleLen;
          }
        }
      }
    }

    return ans === Number.MAX_SAFE_INTEGER ? -1 : ans;
  }
}
