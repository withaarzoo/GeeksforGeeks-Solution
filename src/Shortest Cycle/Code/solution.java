import java.util.*;

class Solution {
    public int shortCycle(int V, int[][] edges) {
        // build adjacency list
        List<Integer>[] adj = new ArrayList[V];
        for (int i = 0; i < V; ++i)
            adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            adj[u].add(v);
            adj[v].add(u);
        }

        int ans = Integer.MAX_VALUE;

        // BFS from every vertex
        for (int s = 0; s < V; ++s) {
            int[] dist = new int[V];
            int[] parent = new int[V];
            Arrays.fill(dist, -1);
            Arrays.fill(parent, -1);

            Queue<Integer> q = new ArrayDeque<>();
            dist[s] = 0;
            q.add(s);

            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : adj[u]) {
                    if (dist[v] == -1) {
                        // expand
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        q.add(v);
                    } else if (parent[u] != v) {
                        // found cycle
                        int cycleLen = dist[u] + dist[v] + 1;
                        ans = Math.min(ans, cycleLen);
                    }
                }
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
