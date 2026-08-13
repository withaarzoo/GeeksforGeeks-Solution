class Solution {
  maxDistance(V, src, edges) {
    // I store outgoing edges as [destination, weight].
    const adj = Array.from({ length: V }, () => []);

    // I store the number of incoming edges for every vertex.
    const indegree = new Array(V).fill(0);

    // I build the adjacency list and calculate indegrees.
    for (const edge of edges) {
      const u = edge[0];
      const v = edge[1];
      const w = edge[2];

      // Store the destination and weight of u -> v.
      adj[u].push([v, w]);

      // v gets one more incoming edge.
      indegree[v]++;
    }

    // I use an array as a queue for Kahn's algorithm.
    const queue = [];

    // I add all vertices with zero indegree.
    for (let i = 0; i < V; i++) {
      if (indegree[i] === 0) {
        queue.push(i);
      }
    }

    // I store the vertices in topological order here.
    const topo = [];

    // This pointer avoids repeatedly removing elements from the front,
    // which would make an array queue slower.
    let front = 0;

    // I generate the topological ordering.
    while (front < queue.length) {
      const u = queue[front++];

      // Add u to the topological order.
      topo.push(u);

      // Process all outgoing edges from u.
      for (const [v] of adj[u]) {
        // One incoming edge of v has now been processed.
        indegree[v]--;

        // v becomes ready when all its incoming edges are processed.
        if (indegree[v] === 0) {
          queue.push(v);
        }
      }
    }

    // Number.MAX_SAFE_INTEGER is large enough for the given constraints,
    // so I use its negative value as the unreachable marker.
    const NEG_INF = Number.MIN_SAFE_INTEGER;

    // Initially every vertex is unreachable.
    const dist = new Array(V).fill(NEG_INF);

    // The source starts with distance 0.
    dist[src] = 0;

    // I process vertices in topological order.
    for (const u of topo) {
      // There is nothing to relax from an unreachable vertex.
      if (dist[u] === NEG_INF) {
        continue;
      }

      // Try every outgoing edge from u.
      for (const [v, w] of adj[u]) {
        // Keep the longest distance found for v.
        dist[v] = Math.max(dist[v], dist[u] + w);
      }
    }

    // Unreachable vertices remain NEG_INF.
    return dist;
  }
}
