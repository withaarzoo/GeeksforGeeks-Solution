class Solution {
  public:
    int goodIndices(vector<int> &arr) {
        int n = arr.size();
        vector<int> status(n, 0);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (status[i] != 0) continue;
            vector<int> path;
            int curr = i;
            while (curr >= 0 && curr < n && status[curr] == 0) {
                status[curr] = 1;
                path.push_back(curr);
                curr += arr[curr];
            }
            bool good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] == 2) good = true;
            int finalStatus = good ? 2 : 3;
            for (int idx : path) status[idx] = finalStatus;
        }
        for (int s : status) if (s == 2) ans++;
        return ans;
    }
};