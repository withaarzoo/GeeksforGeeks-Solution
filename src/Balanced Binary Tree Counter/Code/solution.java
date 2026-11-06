class Solution {
    public int countBT(int h) {
        final int MOD = 1000000007;
        if (h == 1) return 1;
        long prev2 = 1, prev1 = 1;
        for (int i = 2; i <= h; i++) {
            long curr = (prev1 * prev1 % MOD + 2 * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return (int)prev1;
    }
}
