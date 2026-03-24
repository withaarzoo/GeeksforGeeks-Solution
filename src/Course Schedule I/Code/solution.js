class Solution {
  canFinish(n, prerequisites) {
    let adj = Array.from({ length: n }, () => []);
    let indegree = new Array(n).fill(0);

    // Build graph
    for (let [x, y] of prerequisites) {
      adj[y].push(x);
      indegree[x]++;
    }

    let queue = [];

    // Push nodes with 0 indegree
    for (let i = 0; i < n; i++) {
      if (indegree[i] === 0) queue.push(i);
    }

    let count = 0;

    // BFS
    while (queue.length > 0) {
      let node = queue.shift();
      count++;

      for (let nei of adj[node]) {
        indegree[nei]--;
        if (indegree[nei] === 0) queue.push(nei);
      }
    }

    return count === n;
  }
}
