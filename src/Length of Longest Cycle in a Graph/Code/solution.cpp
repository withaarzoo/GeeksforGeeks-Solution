class Solution
{
public:
    int longestCycle(int V, vector<vector<int>> &edges)
    {
        vector<int> adj(V, -1);

        // Convert edge list to direct mapping
        for (auto &e : edges)
        {
            adj[e[0]] = e[1];
        }

        vector<bool> visited(V, false);
        int maxCycle = -1;

        for (int i = 0; i < V; i++)
        {
            if (visited[i])
                continue;

            unordered_map<int, int> mp; // node -> step
            int node = i, step = 0;

            while (node != -1)
            {
                if (mp.count(node))
                {
                    // Cycle detected
                    int cycleLen = step - mp[node];
                    maxCycle = max(maxCycle, cycleLen);
                    break;
                }

                if (visited[node])
                    break;

                mp[node] = step++;
                visited[node] = true;
                node = adj[node];
            }
        }

        return maxCycle;
    }
};