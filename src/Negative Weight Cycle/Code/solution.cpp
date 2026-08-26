class Solution
{
public:
    bool isNegativeWeightCycle(int V, vector<vector<int>> &edges)
    {
        // I keep every distance as 0 so every disconnected component
        // is effectively considered while checking for a negative cycle.
        vector<long long> dist(V, 0);

        // A shortest simple path can use at most V - 1 edges,
        // so I relax every edge for V - 1 rounds.
        for (int i = 0; i < V - 1; i++)
        {
            bool updated = false;

            // I check every directed edge [u, v, w].
            for (auto &edge : edges)
            {
                int u = edge[0];
                int v = edge[1];
                int w = edge[2];

                // If going from u to v gives a smaller value,
                // I update v because this is the Bellman-Ford relaxation step.
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }

            // If no edge changed in this round, all values are already stable,
            // so running more rounds would not change the answer.
            if (!updated)
                break;
        }

        // I make one extra pass. Any further improvement after V - 1 rounds
        // means a negative-weight cycle exists somewhere in the graph.
        for (auto &edge : edges)
        {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (dist[u] + w < dist[v])
            {
                return true;
            }
        }

        // No value can be reduced further, so there is no negative cycle.
        return false;
    }
};