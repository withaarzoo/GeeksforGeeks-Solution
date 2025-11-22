class Solution {
    public int minConnect(int V, int[][] edges) {
        int E = edges.length;
        
        // Not enough edges to ever connect all nodes
        if (E < V - 1) return -1;
        
        int[] parent = new int[V];
        int[] size = new int[V];
        
        // Initialize DSU
        for (int i = 0; i < V; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        
        // Find with path compression
        java.util.function.IntUnaryOperator find = new java.util.function.IntUnaryOperator() {
            @Override
            public int applyAsInt(int x) {
                if (parent[x] == x) return x;
                parent[x] = applyAsInt(parent[x]);
                return parent[x];
            }
        };
        
        // Union by size
        java.util.function.BiConsumer<Integer, Integer> unite = (aObj, bObj) -> {
            int a = aObj, b = bObj;
            a = find.applyAsInt(a);
            b = find.applyAsInt(b);
            if (a == b) return;
            if (size[a] < size[b]) {
                int temp = a; a = b; b = temp;
            }
            parent[b] = a;
            size[a] += size[b];
        };
        
        // Process edges
        for (int[] e : edges) {
            int u = e[0];
            int v = e[1];
            unite.accept(u, v);
        }
        
        // Count components
        int components = 0;
        for (int i = 0; i < V; i++) {
            if (find.applyAsInt(i) == i) components++;
        }
        
        return components - 1;
    }
}
