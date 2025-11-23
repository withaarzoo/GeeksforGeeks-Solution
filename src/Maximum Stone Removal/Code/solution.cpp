class DSU
{
public:
    vector<int> parent, rankv;

    DSU(int n)
    {
        parent.resize(n);
        rankv.assign(n, 0);
        for (int i = 0; i < n; ++i)
            parent[i] = i;
    }

    int find(int x)
    {
        // Path compression
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    void unite(int a, int b)
    {
        a = find(a);
        b = find(b);
        if (a == b)
            return;

        // Union by rank
        if (rankv[a] < rankv[b])
        {
            parent[a] = b;
        }
        else if (rankv[b] < rankv[a])
        {
            parent[b] = a;
        }
        else
        {
            parent[b] = a;
            rankv[a]++;
        }
    }
};

class Solution
{
public:
    int maxRemove(vector<vector<int>> &stones)
    {
        int n = stones.size();
        DSU dsu(n);

        unordered_map<int, int> rowRep;
        unordered_map<int, int> colRep;

        for (int i = 0; i < n; ++i)
        {
            int r = stones[i][0];
            int c = stones[i][1];

            if (rowRep.count(r))
            {
                dsu.unite(i, rowRep[r]);
            }
            else
            {
                rowRep[r] = i;
            }

            if (colRep.count(c))
            {
                dsu.unite(i, colRep[c]);
            }
            else
            {
                colRep[c] = i;
            }
        }

        int components = 0;
        for (int i = 0; i < n; ++i)
        {
            if (dsu.find(i) == i)
                components++;
        }
        return n - components;
    }
};
