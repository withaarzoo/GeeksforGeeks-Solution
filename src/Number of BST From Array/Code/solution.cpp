#include <bits/stdc++.h>
using namespace std;

/*
 I compute Catalan numbers up to n using DP, then for each value
 count how many elements are smaller (using a sorted copy -> rank).
 The answer for element arr[i] is Catalan[left_count] * Catalan[right_count].
*/
class Solution {
  public:
    vector<int> countBSTs(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n, 0);
        if (n == 0) return ans;

        // 1) Compute catalan numbers up to n (safe as n is small here).
        vector<int> catalan(n+1, 0);
        catalan[0] = 1;
        for (int i = 1; i <= n; ++i) {
            long long sum = 0;
            for (int j = 0; j < i; ++j) {
                sum += 1LL * catalan[j] * catalan[i-1-j];
            }
            catalan[i] = (int)sum;
        }

        // 2) Map value -> number of elements smaller than it (rank)
        vector<int> sorted_arr = arr;
        sort(sorted_arr.begin(), sorted_arr.end());
        unordered_map<int,int> rank;
        for (int i = 0; i < n; ++i) rank[sorted_arr[i]] = i;

        // 3) For each element compute catalan[left] * catalan[right]
        for (int i = 0; i < n; ++i) {
            int left = rank[arr[i]];
            int right = n - 1 - left;
            ans[i] = catalan[left] * catalan[right];
        }
        return ans;
    }
};
