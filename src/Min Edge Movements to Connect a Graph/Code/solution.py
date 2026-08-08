class Solution:
    def minEdgesReq(self, n, edges):
        # m is the number of edges currently present in the graph.
        m = len(edges)

        # A connected graph with n vertices needs at least n - 1 edges.
        # With fewer edges, it is impossible to connect every vertex.
        if m < n - 1:
            return -1

        # parent[i] stores the parent of vertex i in the DSU tree.
        parent = list(range(n))

        # size[i] stores the size of the component represented by i.
        # It is used to keep the DSU tree shallow.
        size = [1] * n

        def find(x):
            # If x is its own parent, x is the component representative.
            if parent[x] == x:
                return x

            # Path compression connects x directly to the representative.
            parent[x] = find(parent[x])

            # Return the representative after compression.
            return parent[x]

        def unite(a, b):
            # Find the representatives of both components.
            a = find(a)
            b = find(b)

            # If both vertices already belong to the same component,
            # this edge does not create a new component connection.
            if a == b:
                return

            # Make a represent the larger component.
            if size[a] < size[b]:
                a, b = b, a

            # Attach the smaller component b below a.
            parent[b] = a

            # Update the size of the merged component.
            size[a] += size[b]

        # Process every edge and merge its two endpoints.
        for u, v in edges:
            unite(u, v)

        # Count the number of connected components.
        components = 0

        # A vertex that is its own parent is a component representative.
        for i in range(n):
            if find(i) == i:
                components += 1

        # If there are k components, k - 1 movements connect them all.
        return components - 1