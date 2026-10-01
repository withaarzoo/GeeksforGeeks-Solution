class Solution {
    public int minTime(int[] duration, int[][] dependencies) {
        int n = duration.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] d : dependencies) {
            adj.get(d[0]).add(d[1]);
            indeg[d[1]]++;
        }
        int[] finish = new int[n];
        for (int i = 0; i < n; i++) finish[i] = duration[i];
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) q.offer(i);
        }
        int cnt = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            cnt++;
            for (int v : adj.get(u)) {
                finish[v] = Math.max(finish[v], finish[u] + duration[v]);
                if (--indeg[v] == 0) q.offer(v);
            }
        }
        if (cnt < n) return -1;
        int ans = 0;
        for (int t : finish) ans = Math.max(ans, t);
        return ans;
    }
}