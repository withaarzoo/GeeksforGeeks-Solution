#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool isPossible(vector<int> &arr, int k)
    {
        // If array is not guaranteed sorted, sort it.
        // GeeksforGeeks usually gives sorted array, but sorting is safe.
        sort(arr.begin(), arr.end());

        // comparator: first by value, then by length (both ascending)
        auto comp = [](const pair<int, int> &a, const pair<int, int> &b)
        {
            if (a.first == b.first)
                return a.second > b.second; // smaller length has higher priority => return true when a > b
            return a.first > b.first;       // smaller number has higher priority
        };

        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(comp)> pq(comp);

        int i = 0, n = arr.size();
        while (i < n)
        {
            if (pq.empty())
            {
                pq.push({arr[i], 1});
                ++i;
            }
            else
            {
                auto top = pq.top();
                if (arr[i] == top.first)
                {
                    // same value as end of some subsequences -> start a new subsequence
                    pq.push({arr[i], 1});
                    ++i;
                }
                else if (arr[i] == top.first + 1)
                {
                    // extend the shortest subsequence that ends with top.first
                    pq.pop();
                    pq.push({arr[i], top.second + 1});
                    ++i;
                }
                else
                {
                    // arr[i] > top.first + 1 : top subsequence can no longer be extended
                    if (top.second < k)
                        return false;
                    pq.pop();
                }
            }
        }

        // finally ensure every subsequence has length >= k
        while (!pq.empty())
        {
            if (pq.top().second < k)
                return false;
            pq.pop();
        }
        return true;
    }
};
