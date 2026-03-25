class Solution {
  minHeightRoot(V, edges) {
    if (V === 1) return [0];

    let adj = Array.from({ length: V }, () => []);
    let degree = new Array(V).fill(0);

    // Build graph
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
      degree[u]++;
      degree[v]++;
    }

    let queue = [];

    // Initial leaves
    for (let i = 0; i < V; i++) {
      if (degree[i] === 1) queue.push(i);
    }

    let remainingNodes = V;

    while (remainingNodes > 2) {
      let size = queue.length;
      remainingNodes -= size;

      let newLeaves = [];

      for (let leaf of queue) {
        for (let neighbor of adj[leaf]) {
          degree[neighbor]--;

          if (degree[neighbor] === 1) {
            newLeaves.push(neighbor);
          }
        }
      }

      queue = newLeaves;
    }

    return queue;
  }
}
