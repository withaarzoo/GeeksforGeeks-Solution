#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int minOperations(vector<int> &arr)
    {
        // convert to double to avoid integer truncation when halving
        priority_queue<double> pq;
        double sum = 0.0;
        for (int v : arr)
        {
            pq.push((double)v);
            sum += v;
        }
        double target = sum / 2.0;
        int ops = 0;
        // keep halving largest until sum <= target
        while (sum > target)
        {
            double top = pq.top();
            pq.pop();
            double half = top / 2.0;
            sum -= (top - half); // reduce sum by amount we halved
            pq.push(half);
            ++ops;
        }
        return ops;
    }
};

// Example usage (not required by GfG):
// int main() {
//     Solution s;
//     vector<int> arr = {5, 19, 8, 1};
//     cout << s.minOperations(arr) << endl; // Expected minimal operations
//     return 0;
// }
