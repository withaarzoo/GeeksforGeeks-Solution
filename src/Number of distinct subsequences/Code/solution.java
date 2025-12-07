class Solution {
    int distinctSubseq(String str) {
        final int MOD = 1000000007;
        int n = str.length();

        // dp[i] = number of distinct subsequences of prefix str[0..i-1]
        long[] dp = new long[n + 1];
        dp[0] = 1; // empty subsequence

        // last[pos] = last index (1..n) where character 'a'+pos appeared
        int[] last = new int[26];

        for (int i = 1; i <= n; i++) {
            int chIndex = str.charAt(i - 1) - 'a';

            long val = (2L * dp[i - 1]) % MOD; // double subsequences

            if (last[chIndex] != 0) {
                int prevPos = last[chIndex];
                val = (val - dp[prevPos - 1] + MOD) % MOD; // remove duplicates
            }

            dp[i] = val;
            last[chIndex] = i; // update last position
        }

        return (int) (dp[n] % MOD);
    }
}
