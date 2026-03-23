class Solution {
  longestCycle(V, edges) {
    let adj = new Array(V).fill(-1);

    for (let [u, v] of edges) {
      adj[u] = v;
    }

    let visited = new Array(V).fill(false);
    let maxCycle = -1;

    for (let i = 0; i < V; i++) {
      if (visited[i]) continue;

      let map = new Map(); // node -> step
      let node = i,
        step = 0;

      while (node !== -1) {
        if (map.has(node)) {
          let cycleLen = step - map.get(node);
          maxCycle = Math.max(maxCycle, cycleLen);
          break;
        }

        if (visited[node]) break;

        map.set(node, step++);
        visited[node] = true;
        node = adj[node];
      }
    }

    return maxCycle;
  }
}
