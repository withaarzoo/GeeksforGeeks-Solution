class Solution
{
public:
    int maxEdgesToAdd(int V, vector<vector<int>> &edges)
    {
        // Calculate total possible directed edges without cycles
        // (i -> j) only allowed if i comes before j in topo => total pairs = V*(V-1)/2
        long long total_pairs = 1LL * V * (V - 1) / 2;
        long long existing = edges.size(); // number of edges already present
        long long result = total_pairs - existing;
        return (int)result;
    }
};
