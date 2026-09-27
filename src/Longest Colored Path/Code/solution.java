class Solution {
    public int longestPath(String s, int[][] edges) {
        int n = s.length();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        int[] redMax = new int[n + 1];
        int[] blueMax = new int[n + 1];
        boolean[] vis = new boolean[n + 1];
        process(s, adj, 'R', redMax, vis);
        process(s, adj, 'B', blueMax, vis);
        int ans = 1;
        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) == 'R') ans = Math.max(ans, redMax[i] + 1);
            else ans = Math.max(ans, blueMax[i] + 1);
        }
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            if (s.charAt(u - 1) != s.charAt(v - 1)) {
                if (s.charAt(u - 1) == 'R')
                    ans = Math.max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = Math.max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
    private void process(String s, List<List<Integer>> adj, char col, int[] mx, boolean[] vis) {
        int n = s.length();
        Arrays.fill(vis, false);
        for (int i = 1; i <= n; i++) {
            if (vis[i] || s.charAt(i - 1) != col) continue;
            List<Integer> comp = new ArrayList<>();
            Deque<Integer> st = new ArrayDeque<>();
            st.push(i);
            vis[i] = true;
            while (!st.isEmpty()) {
                int u = st.pop();
                comp.add(u);
                for (int v : adj.get(u)) {
                    if (!vis[v] && s.charAt(v - 1) == col) {
                        vis[v] = true;
                        st.push(v);
                    }
                }
            }
            int sz = comp.size();
            Map<Integer, Integer> id = new HashMap<>();
            for (int j = 0; j < sz; j++) id.put(comp.get(j), j);
            List<List<Integer>> ladj = new ArrayList<>();
            for (int j = 0; j < sz; j++) ladj.add(new ArrayList<>());
            for (int u : comp) {
                for (int v : adj.get(u)) {
                    if (s.charAt(v - 1) == col && id.containsKey(v))
                        ladj.get(id.get(u)).add(id.get(v));
                }
            }
            int[] d1 = bfs(0, ladj, sz);
            int far1 = 0;
            for (int j = 0; j < sz; j++) if (d1[j] > d1[far1]) far1 = j;
            int[] d2 = bfs(far1, ladj, sz);
            int far2 = 0;
            for (int j = 0; j < sz; j++) if (d2[j] > d2[far2]) far2 = j;
            int[] d3 = bfs(far2, ladj, sz);
            for (int j = 0; j < sz; j++)
                mx[comp.get(j)] = Math.max(d2[j], d3[j]);
        }
    }
    private int[] bfs(int start, List<List<Integer>> ladj, int sz) {
        int[] dist = new int[sz];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.add(start);
        dist[start] = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : ladj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return dist;
    }
}