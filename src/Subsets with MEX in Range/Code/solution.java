class Solution {
    long modpow(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) res = res * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return res;
    }
    public int cntSubsets(int arr[], int l, int r) {
        final long MOD = 1000000007;
        int n = arr.length;
        int[] freq = new int[n + 1];
        for (int x : arr) if (x <= n) freq[x]++;
        long[] p2 = new long[n + 1];
        p2[0] = 1;
        for (int i = 1; i <= n; i++) p2[i] = p2[i - 1] * 2 % MOD;
        long ans = 0, cur_prod = 1, cum = 0;
        for (int k = 0; k <= r; k++) {
            if (k > 0) {
                if (freq[k - 1] == 0) cur_prod = 0;
                else cur_prod = cur_prod * (p2[freq[k - 1]] - 1 + MOD) % MOD;
            }
            cum += freq[k];
            if (cur_prod != 0) {
                long free = p2[n] * modpow(p2[(int)cum], MOD - 2, MOD) % MOD;
                long ways = cur_prod * free % MOD;
                if (k >= l) ans = (ans + ways) % MOD;
            }
        }
        return (int)ans;
    }
}