class Solution {
  safeNodes(V, edges) {
    const revGraph = Array.from({ length: V }, () => []);
    const outdeg = new Array(V).fill(0);
    // Build reverse graph and out-degree
    for (const e of edges) {
      const u = e[0],
        v = e[1];
      if (u < 0 || u >= V || v < 0 || v >= V) continue;
      revGraph[v].push(u);
      outdeg[u] += 1;
    }
    const q = [];
    for (let i = 0; i < V; ++i) if (outdeg[i] === 0) q.push(i);
    const safe = [];
    while (q.length) {
      const node = q.shift();
      safe.push(node);
      for (const parent of revGraph[node]) {
        outdeg[parent] -= 1;
        if (outdeg[parent] === 0) q.push(parent);
      }
    }
    safe.sort((a, b) => a - b);
    return safe;
  }
}
