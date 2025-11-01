#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<int> findOrder(int n, vector<vector<int>> &prerequisites)
    {
        // adjacency list and indegree array
        vector<vector<int>> adj(n);
        vector<int> indeg(n, 0);
        for (auto &pr : prerequisites)
        {
            int x = pr[0], y = pr[1]; // to take x, must finish y first -> y -> x
            adj[y].push_back(x);
            indeg[x]++;
        }

        // queue of nodes with indegree 0
        queue<int> q;
        for (int i = 0; i < n; ++i)
            if (indeg[i] == 0)
                q.push(i);

        vector<int> order;
        order.reserve(n);

        while (!q.empty())
        {
            int node = q.front();
            q.pop();
            order.push_back(node);

            for (int nei : adj[node])
            {
                indeg[nei]--;
                if (indeg[nei] == 0)
                    q.push(nei);
            }
        }

        // if all courses included, return order, else return empty
        if ((int)order.size() == n)
            return order;
        return {};
    }
};
