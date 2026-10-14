class Solution {
  public:
    string findRollOut(string& s, vector<int>& roll) {
        int n = s.size();
        vector<int> freq(n + 1, 0);
        for (int x : roll) freq[x]++;
        for (int i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        for (int i = 0; i < n; i++) {
            int shift = freq[i + 1] % 26;
            s[i] = ((s[i] - 'a' + shift) % 26) + 'a';
        }
        return s;
    }
};