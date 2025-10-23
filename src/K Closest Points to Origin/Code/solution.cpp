#include <bits/stdc++.h>
using namespace std;

// I implement a max-heap of pairs (dist, index) so the top is the largest distance.
// We store index so we can return the original point from `points`.
class Solution
{
public:
    vector<vector<int>> kClosest(vector<vector<int>> &points, int k)
    {
        // max-heap: top has largest squared distance
        priority_queue<pair<long long, int>> pq; // pair<dist, idx>

        for (int i = 0; i < (int)points.size(); ++i)
        {
            long long x = points[i][0];
            long long y = points[i][1];
            long long dist = x * x + y * y; // squared distance, avoid sqrt
            pq.push({dist, i});
            if ((int)pq.size() > k)
                pq.pop(); // keep only k smallest distances in pq
        }

        vector<vector<int>> ans;
        ans.reserve(k);
        while (!pq.empty())
        {
            ans.push_back(points[pq.top().second]);
            pq.pop();
        }
        // order doesn't matter. If required sorted order, reverse or sort by dist.
        return ans;
    }
};
