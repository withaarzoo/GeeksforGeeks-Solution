class Solution
{
public:
    int partyHouse(vector<vector<int>> &adj)
    {
        int n = adj.size();
        if (n == 1)
            return 0; // single house, distance is zero

        // helper that returns {farthest node index, distance to it}
        auto bfs = [&](int start)
        {
            vector<int> dist(n, -1);
            queue<int> q;
            q.push(start);
            dist[start] = 0;
            int far = start;
            while (!q.empty())
            {
                int u = q.front();
                q.pop();
                for (int v : adj[u])
                {
                    int idx = v - 1; // convert 1-based house number to 0-based index
                    if (dist[idx] == -1)
                    {
                        dist[idx] = dist[u] + 1;
                        q.push(idx);
                        if (dist[idx] > dist[far])
                            far = idx;
                    }
                }
            }
            return make_pair(far, dist[far]);
        };

        // first BFS: find one end of the diameter
        auto [u, _] = bfs(0);
        // second BFS: find the other end and the length of the diameter
        auto [v, diameter] = bfs(u);

        // radius is ceil(diameter / 2)
        return (diameter + 1) / 2;
    }
};