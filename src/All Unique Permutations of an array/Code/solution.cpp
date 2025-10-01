#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<vector<int>> uniquePerms(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> res;
        if (n == 0) {
            res.push_back({}); // one empty permutation
            return res;
        }
        sort(arr.begin(), arr.end());                // group duplicates
        vector<int> curr;                            // current permutation
        vector<bool> used(n, false);                 // which indices are used

        // recursive lambda for backtracking
        function<void()> dfs = [&]() {
            if ((int)curr.size() == n) {
                res.push_back(curr);                 // store a copy
                return;
            }
            for (int i = 0; i < n; ++i) {
                if (used[i]) continue;               // skip already used index
                // skip duplicates: if same value as previous and previous not used in this permutation
                if (i > 0 && arr[i] == arr[i-1] && !used[i-1]) continue;
                used[i] = true;
                curr.push_back(arr[i]);
                dfs();
                curr.pop_back();                     // backtrack
                used[i] = false;
            }
        };

        dfs();
        return res;
    }
};
