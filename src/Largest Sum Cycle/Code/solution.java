class Solution {
    public int largestSumCycle(int[] edge) {
        int n = edge.length;
        int[] indeg = new int[n];
        for (int i = 0; i < n; i++) {
            if (edge[i] != -1) indeg[edge[i]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        boolean[] vis = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                q.add(i);
                vis[i] = true;
            }
        }
        while (!q.isEmpty()) {
            int u = q.poll();
            int v = edge[u];
            if (v != -1) {
                indeg[v]--;
                if (indeg[v] == 0) {
                    q.add(v);
                    vis[v] = true;
                }
            }
        }
        long ans = -1;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                long sum = 0;
                int cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = Math.max(ans, sum);
            }
        }
        return (int)ans;
    }
}