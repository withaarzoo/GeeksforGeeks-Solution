class Solution {
    public ArrayList<Integer> maximumWeight(int n, int[][] edges, int[] queries) {
        Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));
        int q = queries.length;
        int[][] sortedQ = new int[q][2];
        for (int i = 0; i < q; i++) {
            sortedQ[i][0] = queries[i];
            sortedQ[i][1] = i;
        }
        Arrays.sort(sortedQ, (a, b) -> Integer.compare(a[0], b[0]));
        int[] parent = new int[n + 1];
        int[] sz = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
            sz[i] = 1;
        }
        long paths = 0;
        int[] ans = new int[q];
        int j = 0;
        for (int[] query : sortedQ) {
            int x = query[0], idx = query[1];
            while (j < edges.length && edges[j][2] <= x) {
                int u = edges[j][0], v = edges[j][1];
                int pu = find(parent, u), pv = find(parent, v);
                if (pu != pv) {
                    paths += (long) sz[pu] * sz[pv];
                    if (sz[pu] < sz[pv]) {
                        int tmp = pu; pu = pv; pv = tmp;
                    }
                    parent[pv] = pu;
                    sz[pu] += sz[pv];
                }
                j++;
            }
            ans[idx] = (int) paths;
        }
        ArrayList<Integer> res = new ArrayList<>();
        for (int val : ans) res.add(val);
        return res;
    }
    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
}