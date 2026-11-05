class Solution {
  public:
    int getMinimumDays(string &s, vector<int> &p) {
        int n = s.size();
        vector<int> day(n);
        for (int i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        int ans = 0;
        for (int i = 0; i < n - 1; i++) {
            if (s[i] == s[i + 1]) {
                ans = max(ans, min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
};