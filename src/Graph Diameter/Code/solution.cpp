#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    // BFS that starts from `start`. It fills `dist` and returns the farthest node and
    // also returns the list of nodes visited in this component (componentNodes).
    pair<int, vector<int>> bfs_collect(int start, const vector<vector<int>> &adj)
    {
        int n = adj.size();
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(start);
        dist[start] = 0;
        int farthest = start;
        vector<int> componentNodes;
        while (!q.empty())
        {
            int u = q.front();
            q.pop();
            componentNodes.push_back(u);
            if (dist[u] > dist[farthest])
                farthest = u;
            for (int v : adj[u])
            {
                if (dist[v] == -1)
                {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return {farthest, componentNodes};
    }

    // BFS from node `src` to compute maximum distance (in edges) reachable from src.
    int bfs_maxdist(int src, const vector<vector<int>> &adj)
    {
        int n = adj.size();
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(src);
        dist[src] = 0;
        int maxd = 0;
        while (!q.empty())
        {
            int u = q.front();
            q.pop();
            maxd = max(maxd, dist[u]);
            for (int v : adj[u])
            {
                if (dist[v] == -1)
                {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return maxd;
    }

    int diameter(int V, vector<vector<int>> &edges)
    {
        if (V <= 1)
            return 0;
        vector<vector<int>> adj(V);
        for (auto &e : edges)
        {
            int a = e[0], b = e[1];
            adj[a].push_back(b);
            adj[b].push_back(a);
        }

        vector<char> processed(V, 0); // mark components processed
        int answer = 0;
        for (int i = 0; i < V; ++i)
        {
            if (processed[i])
                continue;
            // First BFS to find farthest node u and list of nodes in this component
            auto res = bfs_collect(i, adj);
            int u = res.first;
            vector<int> compNodes = res.second;
            // Mark component nodes as processed so we don't repeat
            for (int node : compNodes)
                processed[node] = 1;
            // Second BFS from u to get the diameter (in edges) for this component
            int compDiam = bfs_maxdist(u, adj);
            answer = max(answer, compDiam);
        }
        return answer;
    }
};
