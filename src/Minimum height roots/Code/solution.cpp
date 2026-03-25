class Solution
{
public:
    vector<int> minHeightRoot(int V, vector<vector<int>> &edges)
    {
        // Edge case: single node
        if (V == 1)
            return {0};

        // Step 1: Build graph
        vector<vector<int>> adj(V);
        vector<int> degree(V, 0);

        for (auto &e : edges)
        {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }

        // Step 2: Initialize leaves
        queue<int> q;
        for (int i = 0; i < V; i++)
        {
            if (degree[i] == 1)
            {
                q.push(i);
            }
        }

        int remainingNodes = V;

        // Step 3: Trim leaves
        while (remainingNodes > 2)
        {
            int size = q.size();
            remainingNodes -= size;

            while (size--)
            {
                int leaf = q.front();
                q.pop();

                for (int neighbor : adj[leaf])
                {
                    degree[neighbor]--;

                    if (degree[neighbor] == 1)
                    {
                        q.push(neighbor);
                    }
                }
            }
        }

        // Remaining nodes are answer
        vector<int> result;
        while (!q.empty())
        {
            result.push_back(q.front());
            q.pop();
        }

        return result;
    }
};