class Solution {
    int[] parent;
    int[] size;

    // Find the representative of a component.
    // Path compression makes repeated find operations very fast.
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

        // They are already connected, so no merge is needed.
        if (a == b)
            return;

        // Always attach the smaller component to the larger one.
        if (size[a] < size[b]) {
            int temp = a;
            a = b;
            b = temp;
        }

        // Make a the parent of b and update the size.
        parent[b] = a;
        size[a] += size[b];
    }

    int minEdgesReq(int n, int[][] edges) {
        // Count the number of available edges.
        int m = edges.length;

        // At least n - 1 edges are required to connect n vertices.
        if (m < n - 1)
            return -1;

        // Create the DSU arrays for all vertices.
        parent = new int[n];
        size = new int[n];

        // Initially, every vertex forms its own component.
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        // Process every edge and merge its two endpoints.
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            // Join the components containing u and v.
            unite(u, v);
        }

        // Count how many different connected components remain.
        int components = 0;

        // Every vertex that is its own parent represents one component.
        for (int i = 0; i < n; i++) {
            if (find(i) == i)
                components++;
        }

        // k components require k - 1 movements to become one component.
        return components - 1;
    }
}