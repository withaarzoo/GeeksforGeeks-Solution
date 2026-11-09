class Solution {
  public:
    int getCount(string &s, int k) {
        int cnt[26] = {0};
        int n = s.size();
        for (int i = 0; i < n; i++) {
            if (i == 0 || s[i] != s[i - 1]) {
                cnt[s[i] - 'a']++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == k) ans++;
        }
        return ans;
    }
};