class Solution {
  // DFS function
  dfs(node, adj, visited) {
    visited[node] = true;

    // Visit all neighbours
    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        this.dfs(neighbor, adj, visited);
      }
    }
  }

  findMotherVertex(V, edges) {
    // Create adjacency list
    let adj = Array.from({ length: V }, () => []);

    for (let [u, v] of edges) {
      adj[u].push(v);
    }

    let visited = new Array(V).fill(false);

    let candidate = -1;

    // Find candidate mother vertex
    for (let i = 0; i < V; i++) {
      if (!visited[i]) {
        this.dfs(i, adj, visited);

        // Store last finished node
        candidate = i;
      }
    }

    // Reset visited array
    visited.fill(false);

    // Verify candidate
    this.dfs(candidate, adj, visited);

    for (let i = 0; i < V; i++) {
      if (!visited[i]) {
        return -1;
      }
    }

    return candidate;
  }
}
