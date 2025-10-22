#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    void nearlySorted(vector<int> &arr, int k)
    {
        int n = arr.size();
        if (n <= 1 || k <= 0)
            return; // already sorted or no displacement

        // min-heap
        priority_queue<int, vector<int>, greater<int>> pq;

        // push first k+1 elements (or all if smaller)
        for (int i = 0; i < n && i <= k; ++i)
            pq.push(arr[i]);

        int index = 0; // position to place smallest element
        // for the rest of the elements, push next and pop smallest to place
        for (int i = k + 1; i < n; ++i)
        {
            arr[index++] = pq.top();
            pq.pop();
            pq.push(arr[i]);
        }

        // empty remaining heap
        while (!pq.empty())
        {
            arr[index++] = pq.top();
            pq.pop();
        }
    }
};
