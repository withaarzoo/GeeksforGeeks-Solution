#include <bits/stdc++.h>
using namespace std;

/*
Count number of shortest paths from node 0 to node V-1 in a weighted undirected graph.
Signature matches: int countPaths(int V, vector<vector<int>>& edges)
edges: each entry [u, v, w]
*/
class Solution
{
public:
    int countPaths(int V, vector<vector<int>> &edges)
    {
        const long long INF = LLONG_MAX / 4;
        const int MOD = 1e9 + 7;
        // adjacency list: (neighbor, weight)
        vector<vector<pair<int, int>>> adj(V);
        for (auto &e : edges)
        {
            int u = e[0], v = e[1], w = e[2];
            adj[u].push_back({v, w});
            adj[v].push_back({u, w}); // undirected
        }
        // distance and ways
        vector<long long> dist(V, INF);
        vector<int> ways(V, 0);
        // min-heap: (distance, node)
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
        dist[0] = 0;
        ways[0] = 1;
        pq.push({0LL, 0});
        while (!pq.empty())
        {
            auto [d, node] = pq.top();
            pq.pop();
            if (d > dist[node])
                continue; // stale
            for (auto &pr : adj[node])
            {
                int nei = pr.first;
                int w = pr.second;
                long long nd = d + w;
                if (nd < dist[nei])
                {
                    dist[nei] = nd;
                    ways[nei] = ways[node];
                    pq.push({nd, nei});
                }
                else if (nd == dist[nei])
                {
                    ways[nei] = (ways[nei] + ways[node]) % MOD;
                }
            }
        }
        return ways[V - 1] % MOD;
    }
};
