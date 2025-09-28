#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> longestSubarray(vector<int>& arr, int x) {
        int n = arr.size();
        if (n == 0) return {};
        deque<int> maxD; // indices of candidates for max, values decreasing
        deque<int> minD; // indices of candidates for min, values increasing

        int l = 0;
        int bestL = 0, bestLen = 0;

        for (int r = 0; r < n; ++r) {
            // maintain decreasing max deque
            while (!maxD.empty() && arr[r] > arr[maxD.back()]) maxD.pop_back();
            maxD.push_back(r);

            // maintain increasing min deque
            while (!minD.empty() && arr[r] < arr[minD.back()]) minD.pop_back();
            minD.push_back(r);

            // shrink window from left while invalid
            while (!maxD.empty() && !minD.empty() && (long long)arr[maxD.front()] - arr[minD.front()] > x) {
                if (maxD.front() == l) maxD.pop_front();
                if (minD.front() == l) minD.pop_front();
                ++l;
            }

            int len = r - l + 1;
            if (len > bestLen) { // strictly greater -> ensures smallest starting index for ties
                bestLen = len;
                bestL = l;
            }
        }

        return vector<int>(arr.begin() + bestL, arr.begin() + bestL + bestLen);
    }
};
