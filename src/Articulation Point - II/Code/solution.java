class Solution {
    static int timer;

    static void dfs(int node, int parent, ArrayList<Integer>[] adj,
                    boolean[] vis, int[] tin, int[] low, boolean[] mark) {

        vis[node] = true;
        tin[node] = low[node] = timer++;
        int childCount = 0;

        for (int neighbor : adj[node]) {

            // Ignore parent edge
            if (neighbor == parent)
                continue;

            // Already visited node
            if (vis[neighbor]) {
                low[node] = Math.min(low[node], tin[neighbor]);
            } 
            else {
                dfs(neighbor, node, adj, vis, tin, low, mark);

                // Update low value
                low[node] = Math.min(low[node], low[neighbor]);

                // Articulation point condition for non-root
                if (low[neighbor] >= tin[node] && parent != -1) {
                    mark[node] = true;
                }

                childCount++;
            }
        }

        // Root node condition
        if (parent == -1 && childCount > 1) {
            mark[node] = true;
        }
    }

    static ArrayList<Integer> articulationPoints(int V, int[][] edges) {
        timer = 0;

        ArrayList<Integer>[] adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }

        // Build adjacency list
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            adj[u].add(v);
            adj[v].add(u);
        }

        boolean[] vis = new boolean[V];
        int[] tin = new int[V];
        int[] low = new int[V];
        boolean[] mark = new boolean[V];

        // DFS for disconnected graph
        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        ArrayList<Integer> ans = new ArrayList<>();

        for (int i = 0; i < V; i++) {
            if (mark[i]) {
                ans.add(i);
            }
        }

        if (ans.size() == 0) {
            ans.add(-1);
        }

        return ans;
    }
}