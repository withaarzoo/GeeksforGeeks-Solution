class Solution
{
public:
    int shortestPath(int V, int src, int dest, vector<vector<int>> &edges)
    {
        // Total number of nodes after adding virtual nodes
        int totalNodes = V;

        // Adjacency list for the transformed graph
        vector<vector<int>> adj(V + edges.size());

        // Build the transformed graph
        for (auto &edge : edges)
        {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (w == 1)
            {
                // Weight 1 edge remains unchanged
                adj[u].push_back(v);
                adj[v].push_back(u);
            }
            else
            {
                // Create one virtual node for a weight 2 edge
                int newNode = totalNodes++;

                // Replace weight 2 with two weight 1 edges
                adj[u].push_back(newNode);
                adj[newNode].push_back(u);

                adj[newNode].push_back(v);
                adj[v].push_back(newNode);
            }
        }

        // Distance array (-1 means unvisited)
        vector<int> dist(totalNodes, -1);

        // Normal BFS queue
        queue<int> q;

        // Start from source
        q.push(src);
        dist[src] = 0;

        while (!q.empty())
        {
            int node = q.front();
            q.pop();

            // Visit every neighbor
            for (int next : adj[node])
            {
                if (dist[next] == -1)
                {
                    dist[next] = dist[node] + 1;
                    q.push(next);
                }
            }
        }

        // Return shortest distance to destination
        return dist[dest];
    }
};