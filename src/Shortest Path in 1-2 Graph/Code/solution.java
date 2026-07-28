import java.util.*;

class Solution {
    public int shortestPath(int V, int src, int dest, int[][] edges) {

        // Total nodes after adding virtual nodes
        int totalNodes = V;

        // Adjacency list for transformed graph
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();

        // Maximum possible nodes = V + number of edges
        for (int i = 0; i < V + edges.length; i++) {
            adj.add(new ArrayList<>());
        }

        // Build transformed graph
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (w == 1) {
                // Normal edge
                adj.get(u).add(v);
                adj.get(v).add(u);
            } else {
                // Create virtual node
                int newNode = totalNodes++;

                // Replace weight 2 edge
                adj.get(u).add(newNode);
                adj.get(newNode).add(u);

                adj.get(newNode).add(v);
                adj.get(v).add(newNode);
            }
        }

        // Distance array
        int[] dist = new int[totalNodes];
        Arrays.fill(dist, -1);

        Queue<Integer> queue = new LinkedList<>();

        // Start BFS
        queue.offer(src);
        dist[src] = 0;

        while (!queue.isEmpty()) {
            int node = queue.poll();

            for (int next : adj.get(node)) {
                if (dist[next] == -1) {
                    dist[next] = dist[node] + 1;
                    queue.offer(next);
                }
            }
        }

        // Return answer
        return dist[dest];
    }
}