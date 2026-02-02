#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int maxCircularSum(vector<int> &arr)
    {
        long long total = 0;
        long long max_ending = LLONG_MIN, max_so_far = LLONG_MIN;
        long long min_ending = LLONG_MAX, min_so_far = LLONG_MAX;

        // Initialize Kadane trackers properly for first element
        if (!arr.empty())
        {
            max_ending = max_so_far = arr[0];
            min_ending = min_so_far = arr[0];
            total = arr[0];
        }

        for (size_t i = 1; i < arr.size(); ++i)
        {
            int x = arr[i];
            // Kadane for max subarray
            max_ending = max<long long>(x, max_ending + x);
            max_so_far = max(max_so_far, max_ending);

            // Kadane for min subarray
            min_ending = min<long long>(x, min_ending + x);
            min_so_far = min(min_so_far, min_ending);

            total += x;
        }

        // If all numbers are negative, max_so_far is the answer
        if (max_so_far < 0)
            return (int)max_so_far;

        // Otherwise, either non-wrapping max or wrapping max = total - min_subarray
        long long wrap_max = total - min_so_far;
        long long ans = max(max_so_far, wrap_max);
        return (int)ans;
    }
};
