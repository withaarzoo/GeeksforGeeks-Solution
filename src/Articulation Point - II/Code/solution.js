class Solution {
  constructor() {
    this.timer = 0;
  }

  dfs(node, parent, adj, vis, tin, low, mark) {
    vis[node] = true;
    tin[node] = low[node] = this.timer++;
    let childCount = 0;

    for (let neighbor of adj[node]) {
      // Ignore parent edge
      if (neighbor === parent) continue;

      // Already visited node
      if (vis[neighbor]) {
        low[node] = Math.min(low[node], tin[neighbor]);
      } else {
        this.dfs(neighbor, node, adj, vis, tin, low, mark);

        // Update low value
        low[node] = Math.min(low[node], low[neighbor]);

        // Articulation point condition for non-root
        if (low[neighbor] >= tin[node] && parent !== -1) {
          mark[node] = true;
        }

        childCount++;
      }
    }

    // Root node condition
    if (parent === -1 && childCount > 1) {
      mark[node] = true;
    }
  }

  articulationPoints(V, edges) {
    let adj = Array.from({ length: V }, () => []);

    // Build adjacency list
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    let vis = Array(V).fill(false);
    let tin = Array(V).fill(-1);
    let low = Array(V).fill(-1);
    let mark = Array(V).fill(false);

    // DFS for all components
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        this.dfs(i, -1, adj, vis, tin, low, mark);
      }
    }

    let ans = [];

    for (let i = 0; i < V; i++) {
      if (mark[i]) {
        ans.push(i);
      }
    }

    return ans.length ? ans : [-1];
  }
}
