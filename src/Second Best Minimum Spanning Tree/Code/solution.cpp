class Solution
{
    // Disjoint Set Union (Union-Find)
    struct DSU
    {
        vector<int> parent, rnk;
        DSU(int n = 0)
        {
            parent.resize(n);
            rnk.assign(n, 0);
            iota(parent.begin(), parent.end(), 0);
        }
        int find(int x)
        {
            if (parent[x] == x)
                return x;
            return parent[x] = find(parent[x]); // path compression
        }
        bool unite(int a, int b)
        {
            a = find(a);
            b = find(b);
            if (a == b)
                return false;
            if (rnk[a] < rnk[b])
                swap(a, b);
            parent[b] = a;
            if (rnk[a] == rnk[b])
                rnk[a]++;
            return true;
        }
    };

public:
    int secondMST(int V, vector<vector<int>> &edges)
    {
        int E = edges.size();
        if (E == 0)
            return -1;

        // Pack edges into a simple struct
        struct Edge
        {
            int u, v, w;
        };
        vector<Edge> sorted(E);
        for (int i = 0; i < E; ++i)
        {
            sorted[i] = {edges[i][0], edges[i][1], edges[i][2]};
        }

        // Sort by weight for Kruskal
        sort(sorted.begin(), sorted.end(),
             [](const Edge &a, const Edge &b)
             { return a.w < b.w; });

        // First MST
        DSU dsu(V);
        int mstWeight = 0;
        vector<int> mstIndices; // indices in sorted[] that are used
        mstIndices.reserve(V - 1);

        for (int i = 0; i < E; ++i)
        {
            if (dsu.unite(sorted[i].u, sorted[i].v))
            {
                mstWeight += sorted[i].w;
                mstIndices.push_back(i);
            }
        }

        // If graph is not fully connected
        if ((int)mstIndices.size() != V - 1)
            return -1;

        int best = INT_MAX;

        // For each edge of the MST, forbid it and rebuild MST
        for (int bannedIdx : mstIndices)
        {
            DSU d2(V);
            int curWeight = 0;
            int usedEdges = 0;

            for (int i = 0; i < E; ++i)
            {
                if (i == bannedIdx)
                    continue; // skip this MST edge

                if (d2.unite(sorted[i].u, sorted[i].v))
                {
                    curWeight += sorted[i].w;
                    usedEdges++;

                    // If already worse than current best, we can stop early
                    if (curWeight >= best)
                        break;
                }
            }

            // Check if we got a valid spanning tree with higher weight
            if (usedEdges == V - 1 && curWeight > mstWeight)
            {
                best = min(best, curWeight);
            }
        }

        return (best == INT_MAX) ? -1 : best;
    }
};
