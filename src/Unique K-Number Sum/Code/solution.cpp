#include <vector>
#include <functional>
using namespace std;

class Solution {
  public:
    // Returns all unique combinations of k numbers from 1..9 that sum to n.
    vector<vector<int>> combinationSum(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        // DFS lambda: start = next number to try, remaining = remaining sum, k_left = numbers still needed
        function<void(int,int,int)> dfs = [&](int start, int remaining, int k_left) {
            if (k_left == 0) {
                if (remaining == 0) res.push_back(path); // found valid combination
                return;
            }
            // Compute minimal and maximal possible sums for k_left picks
            int min_sum = 0;
            for (int t = 0; t < k_left; ++t) min_sum += (start + t);        // smallest k_left numbers starting at 'start'
            int max_sum = 0;
            for (int t = 0; t < k_left; ++t) max_sum += (9 - t);            // largest k_left numbers from 9 downwards
            if (remaining < min_sum || remaining > max_sum) return;        // prune impossible branches

            for (int num = start; num <= 9; ++num) {
                if (num > remaining) break;   // since numbers are positive, no need to continue
                path.push_back(num);
                dfs(num + 1, remaining - num, k_left - 1); // pick num and move to next
                path.pop_back(); // backtrack
            }
        };

        dfs(1, n, k);
        return res;
    }
};
