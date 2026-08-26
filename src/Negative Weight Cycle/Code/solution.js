class Solution {
  /**
   * @param {number} V
   * @param {number[][]} edges
   * @return {boolean}
   */
  isNegativeWeightCycle(V, edges) {
    // I start every distance at 0 so all disconnected components
    // are considered instead of starting from only one source.
    const dist = new Array(V).fill(0);

    // I relax all edges V - 1 times because a simple path
    // cannot contain more than V - 1 edges.
    for (let i = 0; i < V - 1; i++) {
      let updated = false;

      // I process each directed edge [u, v, w].
      for (const [u, v, w] of edges) {
        // If reaching v through u gives a smaller value,
        // I update dist[v] using edge relaxation.
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          updated = true;
        }
      }

      // If no update happened, all values are stable,
      // so further rounds are unnecessary.
      if (!updated) {
        break;
      }
    }

    // I make one final pass. If any value still decreases,
    // the graph must contain a negative-weight cycle.
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) {
        return true;
      }
    }

    // No further decrease means no negative cycle exists.
    return false;
  }
}
