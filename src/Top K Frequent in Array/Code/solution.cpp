#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<int> topKFreq(vector<int> &arr, int k)
    {
        // Step 1: frequency map
        unordered_map<int, int> freq;
        for (int x : arr)
            freq[x]++;

        // Step 2: min-heap to keep top k elements.
        // The heap stores pairs: (frequency, value).
        // Comparator: smallest frequency on top; if freq tie, smaller value on top.
        // That way when heap size > k we pop the least desirable element
        auto cmp = [](const pair<int, int> &a, const pair<int, int> &b)
        {
            if (a.first != b.first)
                return a.first > b.first; // min-heap by freq
            return a.second > b.second;   // if freq equal, min-heap by value
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);

        for (auto &p : freq)
        {
            pq.push({p.second, p.first}); // {frequency, value}
            if ((int)pq.size() > k)
                pq.pop();
        }

        // Extract results from heap into vector in reverse order
        vector<int> res;
        while (!pq.empty())
        {
            res.push_back(pq.top().second);
            pq.pop();
        }
        // pq had least priority at top, so res is from lowest of top-k to highest; reverse.
        reverse(res.begin(), res.end());
        return res;
    }
};
