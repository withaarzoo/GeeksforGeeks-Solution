class Solution:
    def minConnect(self, V, edges):
        E = len(edges)
        
        # If there are fewer than V-1 edges, it's impossible
        if E < V - 1:
            return -1
        
        # DSU setup
        parent = list(range(V))
        size = [1] * V
        
        # Find with path compression
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        # Union by size
        def unite(a, b):
            a = find(a)
            b = find(b)
            if a == b:
                return
            if size[a] < size[b]:
                a, b = b, a
            parent[b] = a
            size[a] += size[b]
        
        # Process all edges
        for u, v in edges:
            unite(u, v)
        
        # Count connected components
        components = 0
        for i in range(V):
            if find(i) == i:
                components += 1
        
        # Minimum operations needed
        return components - 1
