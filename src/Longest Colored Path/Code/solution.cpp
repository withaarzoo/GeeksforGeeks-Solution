class Solution {
  public:
    int longestPath(string& s, vector<vector<int>>& edges) {
        int n = s.size();
        vector<vector<int>> adj(n + 1);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> redMax(n + 1, 0), blueMax(n + 1, 0);
        vector<bool> vis(n + 1, false);
        auto process = [&](char col, vector<int>& mx) {
            fill(vis.begin(), vis.end(), false);
            for (int i = 1; i <= n; i++) {
                if (vis[i] || s[i - 1] != col) continue;
                vector<int> comp;
                stack<int> st;
                st.push(i);
                vis[i] = true;
                while (!st.empty()) {
                    int u = st.top(); st.pop();
                    comp.push_back(u);
                    for (int v : adj[u]) {
                        if (!vis[v] && s[v - 1] == col) {
                            vis[v] = true;
                            st.push(v);
                        }
                    }
                }
                int sz = comp.size();
                unordered_map<int, int> id;
                for (int j = 0; j < sz; j++) id[comp[j]] = j;
                vector<vector<int>> ladj(sz);
                for (int u : comp) {
                    for (int v : adj[u]) {
                        if (s[v - 1] == col && id.count(v))
                            ladj[id[u]].push_back(id[v]);
                    }
                }
                auto bfs = [&](int start) {
                    vector<int> dist(sz, -1);
                    queue<int> q;
                    q.push(start);
                    dist[start] = 0;
                    int far = start;
                    while (!q.empty()) {
                        int u = q.front(); q.pop();
                        if (dist[u] > dist[far]) far = u;
                        for (int v : ladj[u]) {
                            if (dist[v] == -1) {
                                dist[v] = dist[u] + 1;
                                q.push(v);
                            }
                        }
                    }
                    return make_pair(far, dist);
                };
                auto p1 = bfs(0);
                auto p2 = bfs(p1.first);
                auto p3 = bfs(p2.first);
                for (int j = 0; j < sz; j++)
                    mx[comp[j]] = max(p2.second[j], p3.second[j]);
            }
        };
        process('R', redMax);
        process('B', blueMax);
        int ans = 1;
        for (int i = 1; i <= n; i++) {
            if (s[i - 1] == 'R') ans = max(ans, redMax[i] + 1);
            else ans = max(ans, blueMax[i] + 1);
        }
        for (auto& e : edges) {
            int u = e[0], v = e[1];
            if (s[u - 1] != s[v - 1]) {
                if (s[u - 1] == 'R')
                    ans = max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
};