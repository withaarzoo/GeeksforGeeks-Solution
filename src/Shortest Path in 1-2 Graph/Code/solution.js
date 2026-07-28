/**
 * @param {number} V
 * @param {number} src
 * @param {number} dest
 * @param {number[][]} edges
 * @return {number}
 */

class Solution {
  shortestPath(V, src, dest, edges) {
    // Total nodes after adding virtual nodes
    let totalNodes = V;

    // Adjacency list
    const adj = Array.from({ length: V + edges.length }, () => []);

    // Build transformed graph
    for (const [u, v, w] of edges) {
      if (w === 1) {
        // Normal edge
        adj[u].push(v);
        adj[v].push(u);
      } else {
        // Create virtual node
        const newNode = totalNodes++;

        // Replace weight 2 edge
        adj[u].push(newNode);
        adj[newNode].push(u);

        adj[newNode].push(v);
        adj[v].push(newNode);
      }
    }

    // Distance array
    const dist = new Array(totalNodes).fill(-1);

    // BFS queue
    const queue = [];
    let front = 0;

    queue.push(src);
    dist[src] = 0;

    while (front < queue.length) {
      const node = queue[front++];

      for (const next of adj[node]) {
        if (dist[next] === -1) {
          dist[next] = dist[node] + 1;
          queue.push(next);
        }
      }
    }

    // Return shortest distance
    return dist[dest];
  }
}
