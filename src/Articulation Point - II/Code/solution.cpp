class Solution
{
public:
    int timer = 0;

    void dfs(int node, int parent, vector<int> adj[],
             vector<int> &vis, vector<int> &tin,
             vector<int> &low, vector<int> &mark)
    {

        vis[node] = 1;
        tin[node] = low[node] = timer++;
        int childCount = 0;

        for (int neighbor : adj[node])
        {

            // Ignore the edge to parent
            if (neighbor == parent)
                continue;

            // If already visited, update low value
            if (vis[neighbor])
            {
                low[node] = min(low[node], tin[neighbor]);
            }
            else
            {
                dfs(neighbor, node, adj, vis, tin, low, mark);

                // Update low value after DFS call
                low[node] = min(low[node], low[neighbor]);

                // Check articulation point condition for non-root node
                if (low[neighbor] >= tin[node] && parent != -1)
                {
                    mark[node] = 1;
                }

                childCount++;
            }
        }

        // Special case for root node
        if (parent == -1 && childCount > 1)
        {
            mark[node] = 1;
        }
    }

    vector<int> articulationPoints(int V, vector<vector<int>> &edges)
    {
        vector<int> adj[V];

        // Build adjacency list
        for (auto &edge : edges)
        {
            int u = edge[0];
            int v = edge[1];

            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        vector<int> vis(V, 0), tin(V, -1), low(V, -1), mark(V, 0);

        // Run DFS for every component
        for (int i = 0; i < V; i++)
        {
            if (!vis[i])
            {
                dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        vector<int> ans;

        for (int i = 0; i < V; i++)
        {
            if (mark[i])
            {
                ans.push_back(i);
            }
        }

        if (ans.empty())
            return {-1};

        return ans;
    }
};