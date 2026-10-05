class Solution {
  public:
    vector<vector<int>> socialNetwork(vector<int>& arr) {
        int n = arr.size() + 1;
        vector<int> parent(n + 1, -1);
        for (int i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        vector<vector<int>> res;
        for (int i = 2; i <= n; i++) {
            vector<pair<int, int>> reaches;
            int curr = i;
            int dist = 0;
            while (parent[curr] != -1) {
                curr = parent[curr];
                dist++;
                reaches.push_back({curr, dist});
            }
            sort(reaches.begin(), reaches.end());
            for (auto &p : reaches) {
                res.push_back({i, p.first, p.second});
            }
        }
        return res;
    }
};