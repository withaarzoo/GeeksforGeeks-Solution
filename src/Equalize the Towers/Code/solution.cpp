class Solution
{
public:
    int minCost(vector<int> &heights, vector<int> &cost)
    {

        int n = heights.size();

        // Pair heights and costs together
        vector<pair<long long, long long>> towers;
        for (int i = 0; i < n; i++)
        {
            towers.push_back({heights[i], cost[i]});
        }

        // Sort by height
        sort(towers.begin(), towers.end());

        // Compute total weight (sum of costs)
        long long totalWeight = 0;
        for (int i = 0; i < n; i++)
        {
            totalWeight += towers[i].second;
        }

        // Find weighted median
        long long currWeight = 0;
        long long targetHeight = 0;

        for (int i = 0; i < n; i++)
        {
            currWeight += towers[i].second;
            if (currWeight * 2 >= totalWeight)
            {
                targetHeight = towers[i].first;
                break;
            }
        }

        // Compute minimum cost
        long long result = 0;
        for (int i = 0; i < n; i++)
        {
            result += abs(towers[i].first - targetHeight) * towers[i].second;
        }

        return (int)result;
    }
};
