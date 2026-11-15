class Solution {
    public int subsequenceSum(String s) {
        final int MOD = 1000000007;
        long sum = 0;
        int n = s.length();
        for (int i = 0; i < n; i++) {
            sum = (sum + (s.charAt(i) - '0')) % MOD;
        }
        long pow2 = 1;
        for (int i = 0; i < n - 1; i++) {
            pow2 = (pow2 * 2) % MOD;
        }
        return (int)((sum * pow2) % MOD);
    }
}