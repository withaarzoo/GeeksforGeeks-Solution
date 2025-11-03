#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<int> safeNodes(int V, vector<vector<int>> &edges)
    {
        vector<vector<int>> revGraph(V);
        vector<int> outdeg(V, 0);
        // Build reverse graph and out-degree counts
        for (auto &e : edges)
        {
            int u = e[0], v = e[1];
            if (u < 0 || u >= V || v < 0 || v >= V)
                continue; // defensive
            revGraph[v].push_back(u);
            outdeg[u]++;
        }
        queue<int> q;
        // Start with terminal nodes (out-degree 0)
        for (int i = 0; i < V; ++i)
            if (outdeg[i] == 0)
                q.push(i);
        vector<int> safe;
        while (!q.empty())
        {
            int node = q.front();
            q.pop();
            safe.push_back(node);
            // Removing node conceptually removes edges parent -> node
            for (int parent : revGraph[node])
            {
                if (--outdeg[parent] == 0)
                    q.push(parent);
            }
        }
        sort(safe.begin(), safe.end());
        return safe;
    }
};
