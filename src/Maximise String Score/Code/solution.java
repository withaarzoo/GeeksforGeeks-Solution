import java.util.*;

class Solution {
    public int maxScore(String s, char[][] jumps) {
        int n = s.length();
        if (n <= 1)
            return 0;

        // 1. Prefix sum of ASCII values
        int[] pref = new int[n + 1];
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + s.charAt(i);
        }

        final int ALPHA = 26;

        // 2. nextInd[i][c] = next index > i where char ('a' + c) occurs
        int[][] nextInd = new int[n][ALPHA];
        int[] last = new int[ALPHA];
        Arrays.fill(last, -1);

        for (int i = n - 1; i >= 0; i--) {
            // copy "last" into nextInd[i]
            for (int c = 0; c < ALPHA; c++) {
                nextInd[i][c] = last[c];
            }
            int idx = s.charAt(i) - 'a';
            if (idx >= 0 && idx < ALPHA) {
                last[idx] = i;
            }
        }

        // 3. Character graph: from char -> list of chars it can jump to
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < ALPHA; i++) {
            adj.add(new ArrayList<Integer>());
        }

        if (jumps != null) {
            for (int k = 0; k < jumps.length; k++) {
                if (jumps[k].length < 2)
                    continue;
                int ui = jumps[k][0] - 'a';
                int vi = jumps[k][1] - 'a';
                if (ui >= 0 && ui < ALPHA && vi >= 0 && vi < ALPHA) {
                    adj.get(ui).add(vi);
                }
            }
        }

        // always allow same-character jump and remove duplicates
        for (int c = 0; c < ALPHA; c++) {
            adj.get(c).add(c); // self jump
            boolean[] seen = new boolean[ALPHA];
            ArrayList<Integer> list = adj.get(c);
            ArrayList<Integer> uniq = new ArrayList<>();
            for (int x : list) {
                if (!seen[x]) {
                    seen[x] = true;
                    uniq.add(x);
                }
            }
            adj.set(c, uniq);
        }

        // 4. DP from right to left
        int[] dp = new int[n];
        dp[n - 1] = 0; // last index se koi jump nahi

        for (int i = n - 2; i >= 0; i--) {
            int best = 0;
            int fromIdx = s.charAt(i) - 'a';
            int fromAscii = s.charAt(i);

            // Agar lowercase range se bahar hai toh safe side pe 0
            if (fromIdx < 0 || fromIdx >= ALPHA) {
                dp[i] = 0;
                continue;
            }

            ArrayList<Integer> edges = adj.get(fromIdx);
            for (int t = 0; t < edges.size(); t++) {
                int destChar = edges.get(t); // 0..25
                int j = nextInd[i][destChar];
                if (j == -1)
                    continue; // koi aage aisa char nahi

                // score of substring s[i..j-1]
                int gain = pref[j] - pref[i];

                // same-character jump pe s[i] ko ignore karna hai
                if (destChar == fromIdx) {
                    gain -= fromAscii;
                }

                int cand = gain + dp[j];
                if (cand > best)
                    best = cand;
            }
            dp[i] = best;
        }

        return dp[0];
    }
}
