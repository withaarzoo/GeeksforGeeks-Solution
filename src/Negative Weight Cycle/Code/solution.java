class Solution {
    public boolean isNegativeWeightCycle(int V, int[][] edges) {
        // I keep every distance as 0 so disconnected components
        // are also included in the negative cycle check.
        long[] dist = new long[V];

        // I relax every edge V - 1 times because a simple path
        // can contain at most V - 1 edges.
        for (int i = 0; i < V - 1; i++) {
            boolean updated = false;

            // I process each directed edge [u, v, w].
            for (int[] edge : edges) {
                int u = edge[0];
                int v = edge[1];
                int w = edge[2];

                // If this edge gives v a smaller value,
                // I update dist[v] using the Bellman-Ford rule.
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }

            // If nothing changed, the distances are already stable,
            // so I do not need to continue the remaining rounds.
            if (!updated) {
                break;
            }
        }

        // I check every edge one more time. An improvement here
        // is only possible when a negative-weight cycle exists.
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (dist[u] + w < dist[v]) {
                return true;
            }
        }

        // No additional relaxation means no negative-weight cycle.
        return false;
    }
}