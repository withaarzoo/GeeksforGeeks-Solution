#include <bits/stdc++.h>
using namespace std;

/*
We treat node i in layer0 as id = i
and node i in layer1 as id = i + V
edges are given as vector<vector<int>> where each entry is {u, v, w1, w2}
*/
class Solution
{
public:
    int shortestPath(int V, int a, int b, vector<vector<int>> &edges)
    {
        const long long INF = LLONG_MAX / 4;
        int N = 2 * V;
        vector<vector<pair<int, long long>>> adj(N);

        // Build layered graph
        for (auto &e : edges)
        {
            int u = e[0], v = e[1];
            long long w1 = e[2]; // straight
            long long w2 = e[3]; // curved

            // straight edges: stay in same layer
            adj[u].push_back({v, w1});
            adj[v].push_back({u, w1});
            adj[u + V].push_back({v + V, w1});
            adj[v + V].push_back({u + V, w1});

            // curved edges: only allowed from layer0 to layer1 (both directions because original is undirected)
            adj[u].push_back({v + V, w2});
            adj[v].push_back({u + V, w2});
        }

        // Dijkstra from a (layer0)
        vector<long long> dist(N, INF);
        using pli = pair<long long, int>;
        priority_queue<pli, vector<pli>, greater<pli>> pq;
        dist[a] = 0;
        pq.push({0, a});

        while (!pq.empty())
        {
            auto [d, node] = pq.top();
            pq.pop();
            if (d != dist[node])
                continue;
            if (node == b || node == b + V)
            {
                // we cannot early exit on first encounter safely because a shorter path to the other target may exist,
                // but we could break when popping both b and b+V seen; keeping full Dijkstra is simpler and safe.
            }
            for (auto &pr : adj[node])
            {
                int nxt = pr.first;
                long long w = pr.second;
                if (dist[nxt] > d + w)
                {
                    dist[nxt] = d + w;
                    pq.push({dist[nxt], nxt});
                }
            }
        }

        long long ans = min(dist[b], dist[b + V]);
        if (ans >= INF)
            return -1;
        return (int)ans;
    }
};
