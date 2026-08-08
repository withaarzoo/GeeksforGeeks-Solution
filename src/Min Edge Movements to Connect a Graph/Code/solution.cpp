class Solution {
    vector<int> parent, sz;

    // Find the representative of a component.
    // Path compression makes future find operations faster.
    int find(int x) {
        if (parent[x] == x)
            return x;

        // Point x directly to the component representative.
        return parent[x] = find(parent[x]);
    }

    // Merge the components containing a and b.
    // Union by size keeps the DSU tree shallow.
    void unite(int a, int b) {
        a = find(a);
        b = find(b);

        // They are already in the same component, so nothing changes.
        if (a == b)
            return;

        // Attach the smaller component below the larger component.
        if (sz[a] < sz[b])
            swap(a, b);

        // Make a the parent of b and update the component size.
        parent[b] = a;
        sz[a] += sz[b];
    }

  public:
    int minEdgesReq(int n, vector<vector<int>>& edges) {
        // m is the total number of edges available for the graph.
        int m = edges.size();

        // A connected graph with n vertices needs at least n - 1 edges.
        // If fewer edges exist, connecting all vertices is impossible.
        if (m < n - 1)
            return -1;

        // Initially, every vertex is its own connected component.
        parent.resize(n);
        sz.assign(n, 1);

        // Set every vertex as its own parent.
        for (int i = 0; i < n; i++)
            parent[i] = i;

        // Join the endpoints of every existing edge.
        for (auto &edge : edges) {
            int u = edge[0];
            int v = edge[1];

            // Merge their connected components.
            unite(u, v);
        }

        // Start with zero components and count each unique representative.
        int components = 0;

        // A vertex is a component representative if it is its own parent.
        for (int i = 0; i < n; i++) {
            if (find(i) == i)
                components++;
        }

        // Connecting k components needs exactly k - 1 edge movements.
        return components - 1;
    }
};