class Solution {
    int minOperations(int[] b) {

        final int MOD = 1000000007;
        int n = b.length;

        // Keeps track of visited indices
        boolean[] vis = new boolean[n];

        // Maximum exponent required for every prime
        HashMap<Integer, Integer> map = new HashMap<>();

        // Find every cycle
        for (int i = 0; i < n; i++) {

            if (vis[i])
                continue;

            int cur = i;
            int len = 0;

            // Traverse current cycle
            while (!vis[cur]) {
                vis[cur] = true;
                cur = b[cur] - 1;
                len++;
            }

            // Prime factorization of cycle length
            int x = len;

            for (int p = 2; p * p <= x; p++) {
                if (x % p == 0) {
                    int cnt = 0;

                    while (x % p == 0) {
                        x /= p;
                        cnt++;
                    }

                    map.put(p, Math.max(map.getOrDefault(p, 0), cnt));
                }
            }

            // Remaining prime factor
            if (x > 1)
                map.put(x, Math.max(map.getOrDefault(x, 0), 1));
        }

        long ans = 1;

        // Construct LCM modulo MOD
        for (Integer prime : map.keySet()) {
            int exp = map.get(prime);

            while (exp-- > 0) {
                ans = (ans * prime) % MOD;
            }
        }

        return (int) ans;
    }
}