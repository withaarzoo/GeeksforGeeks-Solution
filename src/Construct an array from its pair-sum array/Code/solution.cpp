#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> constructArr(vector<int>& arr) {
        long long m = arr.size();
        long double disc = 1.0L + 8.0L * (long double)m;
        long long sq = (long long) llround(sqrt(disc));
        long long n = (1 + sq) / 2;
        vector<int> res((size_t)n, 0);
        if (n < 2) return res;

        long long num = (long long)arr[0] + (long long)arr[1] - (long long)arr[n-1];
        long long r0 = num / 2;

        res[0] = (int)r0;
        for (long long i = 1; i < n; ++i) {
            long long val = (long long)arr[i-1] - r0;
            res[(size_t)i] = (int)val;
        }
        return res;
    }
};