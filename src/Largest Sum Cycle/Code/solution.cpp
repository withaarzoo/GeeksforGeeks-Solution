class Solution {
  public:
    int largestSumCycle(vector<int>& edge) {
        int n = edge.size();
        vector<int> indeg(n, 0);
        for (int i = 0; i < n; i++) {
            if (edge[i] != -1) indeg[edge[i]]++;
        }
        queue<int> q;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                q.push(i);
                vis[i] = true;
            }
        }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            int v = edge[u];
            if (v != -1) {
                indeg[v]--;
                if (indeg[v] == 0) {
                    q.push(v);
                    vis[v] = true;
                }
            }
        }
        long long ans = -1;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                long long sum = 0;
                int cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = max(ans, sum);
            }
        }
        return (int)ans;
    }
};