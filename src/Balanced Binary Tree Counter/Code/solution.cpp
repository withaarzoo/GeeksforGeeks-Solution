class Solution {
  public:
    int countBT(int h) {
        const int MOD = 1e9 + 7;
        if (h == 1) return 1;
        long long prev2 = 1, prev1 = 1;
        for (int i = 2; i <= h; i++) {
            long long curr = (prev1 * prev1 % MOD + 2 * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return (int)prev1;
    }
};