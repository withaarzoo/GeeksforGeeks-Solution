class Solution {
    public int[] maxDistance(int V, int src, ArrayList<ArrayList<Integer>> edges) {
        // I create an adjacency list where each entry stores {destination, weight}.
        ArrayList<ArrayList<int[]>> adj = new ArrayList<>();

        // I initialize an empty list for every vertex.
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }

        // I store the number of incoming edges for every vertex.
        int[] indegree = new int[V];

        // I build the graph from the given edge list.
        for (ArrayList<Integer> edge : edges) {
            int u = edge.get(0);
            int v = edge.get(1);
            int w = edge.get(2);

            // Store destination and weight together.
            adj.get(u).add(new int[] { v, w });

            // v gets one additional incoming edge.
            indegree[v]++;
        }

        // I use a queue for Kahn's topological sorting algorithm.
        Queue<Integer> queue = new ArrayDeque<>();

        // Vertices with zero indegree can be processed first.
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        // This array will store the topological ordering.
        int[] topo = new int[V];

        // I keep track of how many vertices I have placed in topo.
        int index = 0;

        // I generate the topological order.
        while (!queue.isEmpty()) {
            int u = queue.poll();

            // Put the current vertex into the topological order.
            topo[index++] = u;

            // Process every outgoing edge of u.
            for (int[] edge : adj.get(u)) {
                int v = edge[0];

                // One incoming edge of v has been removed.
                indegree[v]--;

                // When v has no remaining incoming edges, it is ready.
                if (indegree[v] == 0) {
                    queue.offer(v);
                }
            }
        }

        // I use Integer.MIN_VALUE to represent an unreachable vertex.
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MIN_VALUE);

        // The source has distance 0 from itself.
        dist[src] = 0;

        // I relax edges in topological order.
        for (int i = 0; i < V; i++) {
            int u = topo[i];

            // I cannot calculate anything from a vertex that is unreachable.
            if (dist[u] == Integer.MIN_VALUE) {
                continue;
            }

            // Try to improve the longest distance of every neighbor.
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int w = edge[1];

                // Keep the largest distance reaching v.
                dist[v] = Math.max(dist[v], dist[u] + w);
            }
        }

        // Unreachable vertices still contain Integer.MIN_VALUE.
        return dist;
    }
}