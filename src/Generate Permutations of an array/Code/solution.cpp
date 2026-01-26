class Solution {
public:
    void backtrack(vector<int>& arr, vector<int>& curr,
                   vector<bool>& used, vector<vector<int>>& result) {
        // If one permutation is complete
        if (curr.size() == arr.size()) {
            result.push_back(curr);
            return;
        }

        for (int i = 0; i < arr.size(); i++) {
            if (used[i]) continue;   // Skip used elements

            used[i] = true;
            curr.push_back(arr[i]);

            backtrack(arr, curr, used, result);

            // Backtrack
            curr.pop_back();
            used[i] = false;
        }
    }

    vector<vector<int>> permuteDist(vector<int>& arr) {
        vector<vector<int>> result;
        vector<int> curr;
        vector<bool> used(arr.size(), false);

        backtrack(arr, curr, used, result);
        return result;
    }
};
