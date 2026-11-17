class Solution {
  public:
    bool findPattern(string& s) {
        int n = s.size();
        int i = 0;
        while (i < n) {
            int x = 0;
            while (i < n && s[i] == 'x') {
                x++;
                i++;
            }
            int y = 0;
            while (i < n && s[i] == 'y') {
                y++;
                i++;
            }
            if (x == 0 || x != y) return false;
        }
        return true;
    }
};