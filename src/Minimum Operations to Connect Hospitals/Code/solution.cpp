class Solution {
  public:
    int minConnect(int V, vector<vector<int>>& edges) {
        int E = edges.size();
        
        // If there are fewer than V-1 edges, it's impossible to connect all hospitals
        if (E < V - 1) return -1;
        
        // Disjoint Set Union (Union-Find) setup
        vector<int> parent(V), sz(V, 1);
        for (int i = 0; i < V; i++) parent[i] = i;
        
        // Find with path compression
        function<int(int)> find = [&](int x) -> int {
            if (parent[x] == x) return x;
            return parent[x] = find(parent[x]);  // path compression
        };
        
        // Union by size
        auto unite = [&](int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) return;  // already in same component
            if (sz[a] < sz[b]) swap(a, b);
            parent[b] = a;
            sz[a] += sz[b];
        };
        
        // Process all edges
        for (auto &e : edges) {
            int u = e[0];
            int v = e[1];
            unite(u, v);
        }
        
        // Count connected components
        int components = 0;
        for (int i = 0; i < V; i++) {
            if (find(i) == i) components++;
        }
        
        // Minimum operations to connect all components into one
        return components - 1;
    }
};
