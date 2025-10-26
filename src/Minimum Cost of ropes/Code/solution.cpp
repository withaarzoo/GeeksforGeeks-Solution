#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int minCost(vector<int> &arr)
    {
        // If there are 0 or 1 ropes, no cost
        if (arr.size() <= 1)
            return 0;

        // Min-heap: smallest element at top
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int x : arr)
            pq.push(x);

        long long total = 0; // use long long to avoid overflow for large sums
        while (pq.size() > 1)
        {
            int a = pq.top();
            pq.pop();
            int b = pq.top();
            pq.pop();
            int sum = a + b;
            total += sum;
            pq.push(sum);
        }
        return (int)total;
    }
};
