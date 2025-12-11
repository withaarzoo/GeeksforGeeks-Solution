#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<long long> constructArr(const vector<long long> &arr)
    {
        long long m = arr.size();
        // solve n*(n-1)/2 = m  =>  n = (1 + sqrt(1 + 8*m)) / 2
        long long disc = 1 + 8 * m;
        long long sq = (long long)sqrt((long double)disc);
        long long n = (1 + sq) / 2;

        if (n < 2)
            return {}; // invalid / nothing to construct

        if (n == 2)
        {
            // only one sum s = arr[0], return one valid pair [s, 0]
            return {arr[0], 0};
        }

        // s01 = arr[0] = res0 + res1
        // s02 = arr[1] = res0 + res2
        // s12 = arr[n-1] = res1 + res2
        long long s01 = arr[0];
        long long s02 = arr[1];
        long long s12 = arr[n - 1];

        long long res0 = (s01 + s02 - s12) / 2; // derived formula

        vector<long long> res(n);
        res[0] = res0;
        for (long long i = 1; i < n; ++i)
        {
            // arr[i-1] = res0 + res[i]  => res[i] = arr[i-1] - res0
            res[i] = arr[i - 1] - res0;
        }
        return res;
    }
};
