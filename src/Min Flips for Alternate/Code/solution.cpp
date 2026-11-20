class Solution {
  public:
    int minFlips(string &s) {
        int n = s.size();
        int flips0 = 0, flips1 = 0;
        for (int i = 0; i < n; i++) {
            char expected0 = (i % 2 == 0) ? '0' : '1';
            char expected1 = (i % 2 == 0) ? '1' : '0';
            if (s[i] != expected0) flips0++;
            if (s[i] != expected1) flips1++;
        }
        return min(flips0, flips1);
    }
};