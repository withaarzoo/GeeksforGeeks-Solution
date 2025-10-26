#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<vector<int>> kSmallestPair(vector<int> &arr1, vector<int> &arr2, int k)
    {
        vector<vector<int>> res;
        int n1 = arr1.size(), n2 = arr2.size();
        if (n1 == 0 || n2 == 0 || k == 0)
            return res;

        // min-heap: tuple(sum, i, j)
        using T = tuple<long long, int, int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        // Only need first min(n1, k) rows
        int limit = min(n1, k);
        for (int i = 0; i < limit; ++i)
        {
            pq.emplace((long long)arr1[i] + arr2[0], i, 0);
        }

        while (!pq.empty() && (int)res.size() < k)
        {
            auto [sum, i, j] = pq.top();
            pq.pop();
            res.push_back({arr1[i], arr2[j]});
            if (j + 1 < n2)
            {
                pq.emplace((long long)arr1[i] + arr2[j + 1], i, j + 1);
            }
        }
        return res;
    }
};
