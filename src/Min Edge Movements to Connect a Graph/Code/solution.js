class Solution {
    constructor() {
        // These arrays store the DSU parent and component size.
        this.parent = [];
        this.size = [];
    }

    // Find the representative of a component.
    // Path compression makes future find operations faster.
    find(x) {
        if (this.parent[x] === x)
            return x;

        // Connect x directly to the component representative.
        this.parent[x] = this.find(this.parent[x]);

        return this.parent[x];
    }

    // Merge the components containing a and b.
    // Union by size keeps the tree height small.
    unite(a, b) {
        a = this.find(a);
        b = this.find(b);

        // They already belong to the same component.
        if (a === b)
            return;

        // Attach the smaller component below the larger component.
        if (this.size[a] < this.size[b]) {
            [a, b] = [b, a];
        }

        // Merge b into a and update the component size.
        this.parent[b] = a;
        this.size[a] += this.size[b];
    }

    minEdgesReq(n, edges) {
        // Count the total number of available edges.
        const m = edges.length;

        // A connected graph with n vertices requires at least n - 1 edges.
        if (m < n - 1)
            return -1;

        // Initialize the DSU arrays.
        this.parent = new Array(n);
        this.size = new Array(n);

        // Initially, every vertex is a separate component.
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }

        // Process every edge and merge its endpoints.
        for (const edge of edges) {
            const u = edge[0];
            const v = edge[1];

            // Join the components containing u and v.
            this.unite(u, v);
        }

        // Count the number of remaining connected components.
        let components = 0;

        // A vertex that is its own parent represents one component.
        for (let i = 0; i < n; i++) {
            if (this.find(i) === i)
                components++;
        }

        // Connecting k components needs exactly k - 1 movements.
        return components - 1;
    }
}