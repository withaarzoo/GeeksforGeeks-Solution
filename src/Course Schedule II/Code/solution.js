/**
 * JavaScript solution using Kahn's algorithm.
 * @param {number} n
 * @param {number[][]} prerequisites
 * @returns {number[]}
 */
class Solution {
  findOrder(n, prerequisites) {
    // build adjacency list and indegree
    const adj = Array.from({ length: n }, () => []);
    const indeg = new Array(n).fill(0);
    for (const pr of prerequisites) {
      const x = pr[0],
        y = pr[1]; // y -> x
      adj[y].push(x);
      indeg[x] += 1;
    }

    // queue implemented with head index for O(1) pops
    const q = [];
    let head = 0;
    for (let i = 0; i < n; ++i) if (indeg[i] === 0) q.push(i);

    const order = [];
    while (head < q.length) {
      const node = q[head++]; // pop
      order.push(node);
      for (const nei of adj[node]) {
        indeg[nei] -= 1;
        if (indeg[nei] === 0) q.push(nei);
      }
    }

    return order.length === n ? order : [];
  }
}
