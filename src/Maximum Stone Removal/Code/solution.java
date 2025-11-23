import java.util.*;

class DSU {
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
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    void unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b)
            return;

        if (rank[a] < rank[b]) {
            parent[a] = b;
        } else if (rank[b] < rank[a]) {
            parent[b] = a;
        } else {
            parent[b] = a;
            rank[a]++;
        }
    }
}

class Solution {
    int maxRemove(int[][] stones) {
        int n = stones.length;
        DSU dsu = new DSU(n);

        HashMap<Integer, Integer> rowRep = new HashMap<>();
        HashMap<Integer, Integer> colRep = new HashMap<>();

        for (int i = 0; i < n; i++) {
            int r = stones[i][0];
            int c = stones[i][1];

            if (rowRep.containsKey(r)) {
                dsu.unite(i, rowRep.get(r));
            } else {
                rowRep.put(r, i);
            }

            if (colRep.containsKey(c)) {
                dsu.unite(i, colRep.get(c));
            } else {
                colRep.put(c, i);
            }
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (dsu.find(i) == i)
                components++;
        }
        return n - components;
    }
};
