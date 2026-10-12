class Solution {
  public:
    int minSquares(int n, int m) {
        if (n < m) swap(n, m);
        int ans = 0;
        while (m > 0) {
            ans += n / m;
            int r = n % m;
            n = m;
            m = r;
        }
        return ans;
    }
};