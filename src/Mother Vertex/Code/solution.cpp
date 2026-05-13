class Solution {
  public:
    
    // DFS function to visit all reachable nodes
    void dfs(int node, vector<vector<int>>& adj, vector<int>& visited) {
        visited[node] = 1;
        
        // Visit all neighbours
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }

    int findMotherVertex(int V, vector<vector<int>>& edges) {
        
        // Create adjacency list
        vector<vector<int>> adj(V);
        
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        vector<int> visited(V, 0);
        
        int candidate = -1;

        // Find the last finished vertex in DFS
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(i, adj, visited);
                
                // Store current node as possible mother vertex
                candidate = i;
            }
        }

        // Reset visited array for verification DFS
        fill(visited.begin(), visited.end(), 0);

        // Check if candidate can reach all vertices
        dfs(candidate, adj, visited);

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                return -1;
            }
        }

        return candidate;
    }
};