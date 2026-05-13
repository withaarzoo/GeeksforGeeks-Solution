class Solution {
    
    // DFS function to visit all reachable nodes
    void dfs(int node, ArrayList<ArrayList<Integer>> adj, boolean[] visited) {
        visited[node] = true;

        // Visit all neighbours
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }

    public int findMotherVertex(int V, int[][] edges) {
        
        // Create adjacency list
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();

        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        boolean[] visited = new boolean[V];

        int candidate = -1;

        // Find possible mother vertex
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(i, adj, visited);

                // Last finished node becomes candidate
                candidate = i;
            }
        }

        // Reset visited array
        visited = new boolean[V];

        // Verify candidate
        dfs(candidate, adj, visited);

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                return -1;
            }
        }

        return candidate;
    }
}