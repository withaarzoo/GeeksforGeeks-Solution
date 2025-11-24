import java.util.*;

class Solution {

    // Disjoint Set Union
    static class DSU {
        int[] parent;
        int[] rank;

        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        int find(int x) {
            if (parent[x] == x)
                return x;
            parent[x] = find(parent[x]); // path compression
            return parent[x];
        }

        boolean unite(int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b)
                return false;
            if (rank[a] < rank[b]) {
                int tmp = a;
                a = b;
                b = tmp;
            }
            parent[b] = a;
            if (rank[a] == rank[b])
                rank[a]++;
            return true;
        }
    }

    static class Edge {
        int u, v, w;

        Edge(int u, int v, int w) {
            this.u = u;
            this.v = v;
            this.w = w;
        }
    }

    public int secondMST(int V, int[][] edges) {
        int E = edges.length;
        if (E == 0)
            return -1;

        Edge[] arr = new Edge[E];
        for (int i = 0; i < E; i++) {
            arr[i] = new Edge(edges[i][0], edges[i][1], edges[i][2]);
        }

        // sort by weight
        Arrays.sort(arr, (a, b) -> Integer.compare(a.w, b.w));

        // first MST
        DSU dsu = new DSU(V);
        int mstWeight = 0;
        List<Integer> mstIndices = new ArrayList<>();

        for (int i = 0; i < E; i++) {
            if (dsu.unite(arr[i].u, arr[i].v)) {
                mstWeight += arr[i].w;
                mstIndices.add(i);
            }
        }

        if (mstIndices.size() != V - 1)
            return -1; // disconnected

        int best = Integer.MAX_VALUE;

        // Try to ban each MST edge once
        for (int banned : mstIndices) {
            DSU d2 = new DSU(V);
            int curWeight = 0;
            int used = 0;

            for (int i = 0; i < E; i++) {
                if (i == banned)
                    continue;

                if (d2.unite(arr[i].u, arr[i].v)) {
                    curWeight += arr[i].w;
                    used++;
                    if (curWeight >= best)
                        break;
                }
            }

            if (used == V - 1 && curWeight > mstWeight) {
                best = Math.min(best, curWeight);
            }
        }

        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
