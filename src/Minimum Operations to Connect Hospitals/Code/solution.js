/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
    minConnect(V, edges) {
        const E = edges.length;
        
        // If we don't have at least V-1 edges, impossible to connect all hospitals
        if (E < V - 1) return -1;
        
        // DSU arrays
        const parent = new Array(V);
        const size = new Array(V).fill(1);
        for (let i = 0; i < V; i++) parent[i] = i;
        
        // Find with path compression
        const find = (x) => {
            if (parent[x] === x) return x;
            parent[x] = find(parent[x]);
            return parent[x];
        };
        
        // Union by size
        const unite = (a, b) => {
            a = find(a);
            b = find(b);
            if (a === b) return;
            if (size[a] < size[b]) {
                const tmp = a; a = b; b = tmp;
            }
            parent[b] = a;
            size[a] += size[b];
        };
        
        // Process all edges
        for (const [u, v] of edges) {
            unite(u, v);
        }
        
        // Count number of connected components
        let components = 0;
        for (let i = 0; i < V; i++) {
            if (find(i) === i) components++;
        }
        
        // We need components - 1 operations
        return components - 1;
    }
}
