#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Use long long to avoid overflow of sums
    long long maxSubarrSum(const vector<int>& arr, int a, int b) {
        int n = (int)arr.size();
        if (n == 0) return 0;
        // prefix[i] = sum of first i elements (arr[0..i-1])
        vector<long long> prefix(n + 1, 0);
        for (int i = 1; i <= n; ++i) prefix[i] = prefix[i-1] + (long long)arr[i-1];

        deque<int> dq;               // will store indices of prefix in increasing prefix value order
        long long ans = LLONG_MIN;

        for (int r = 1; r <= n; ++r) {
            int leftBound = max(0, r - b);  // smallest allowed left index
            int newIdx   = r - a;           // index that becomes available at this r (if >= 0)

            // remove indices that are out of the window [leftBound, r-a]
            while (!dq.empty() && dq.front() < leftBound) dq.pop_front();

            // if a left index becomes available, insert it maintaining increasing prefix values
            if (newIdx >= 0) {
                while (!dq.empty() && prefix[dq.back()] >= prefix[newIdx]) dq.pop_back();
                dq.push_back(newIdx);
            }

            // current best for subarray ending at r-1 uses min prefix in deque
            if (!dq.empty()) {
                ans = max(ans, prefix[r] - prefix[dq.front()]);
            }
        }
        return ans;
    }
};
