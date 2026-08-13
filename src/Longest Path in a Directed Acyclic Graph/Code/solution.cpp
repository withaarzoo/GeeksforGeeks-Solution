class Solution
{
public:
    vector<int> maxDistance(int V, int src, vector<vector<int>> &edges)
    {
        // I store every outgoing edge as {destination, weight}.
        vector<vector<pair<int, int>>> adj(V);

        // I keep track of how many incoming edges each vertex has.
        vector<int> indegree(V, 0);

        // I build the adjacency list and calculate indegrees.
        for (auto &edge : edges)
        {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            // Add the directed edge u -> v with weight w.
            adj[u].push_back({v, w});

            // v has one more incoming edge.
            indegree[v]++;
        }

        // I use a queue for Kahn's topological sorting algorithm.
        queue<int> q;

        // Every vertex with no incoming edge can come first.
        for (int i = 0; i < V; i++)
        {
            if (indegree[i] == 0)
            {
                q.push(i);
            }
        }

        // This stores the final topological ordering.
        vector<int> topo;

        // I process vertices whose incoming edges are already handled.
        while (!q.empty())
        {
            int u = q.front();
            q.pop();

            // Add the current vertex to the topological order.
            topo.push_back(u);

            // Remove u's outgoing edges one by one.
            for (auto &edge : adj[u])
            {
                int v = edge.first;

                // One incoming edge of v has now been processed.
                indegree[v]--;

                // If no incoming edge remains, v is ready to process.
                if (indegree[v] == 0)
                {
                    q.push(v);
                }
            }
        }

        // I use INT_MIN to represent a vertex that is unreachable from src.
        vector<int> dist(V, INT_MIN);

        // The distance from the source to itself is always 0.
        dist[src] = 0;

        // I process vertices in topological order so every predecessor
        // is handled before its dependent vertex.
        for (int u : topo)
        {
            // I cannot relax edges from an unreachable vertex.
            if (dist[u] == INT_MIN)
            {
                continue;
            }

            // Try every outgoing edge from u.
            for (auto &edge : adj[u])
            {
                int v = edge.first;
                int w = edge.second;

                // I keep the maximum distance found for v.
                dist[v] = max(dist[v], dist[u] + w);
            }
        }

        // Unreachable vertices remain INT_MIN as required.
        return dist;
    }
};