class Solution {
  public:
    bool isPossible(int n, int m, string& s) {
        int minR = 0, maxR = 0, minC = 0, maxC = 0;
        int r = 0, c = 0;
        for (char ch : s) {
            if (ch == 'L') c--;
            else if (ch == 'R') c++;
            else if (ch == 'D') r--;
            else if (ch == 'U') r++;
            minR = min(minR, r);
            maxR = max(maxR, r);
            minC = min(minC, c);
            maxC = max(maxC, c);
        }
        return (maxR - minR < n) && (maxC - minC < m);
    }
};