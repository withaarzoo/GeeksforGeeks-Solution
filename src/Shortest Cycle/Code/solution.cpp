#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int shortCycle(int V, vector<vector<int>> &edges)
    {
        // build adjacency list
        vector<vector<int>> adj(V);
        for (auto &e : edges)
        {
            int u = e[0], v = e[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        int ans = INT_MAX;

        // BFS from each node
        for (int s = 0; s < V; ++s)
        {
            vector<int> dist(V, -1), parent(V, -1);
            queue<int> q;
            dist[s] = 0;
            q.push(s);

            while (!q.empty())
            {
                int u = q.front();
                q.pop();
                for (int v : adj[u])
                {
                    if (dist[v] == -1)
                    {
                        // unvisited: normal BFS expansion
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        q.push(v);
                    }
                    else if (parent[u] != v)
                    {
                        // visited and not the parent => found a cycle
                        int cycle_len = dist[u] + dist[v] + 1;
                        ans = min(ans, cycle_len);
                    }
                }
            }
        }

        return ans == INT_MAX ? -1 : ans;
    }
};
