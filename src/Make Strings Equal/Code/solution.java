import java.util.*;

class Solution {
    public int minCost(String s, String t, char[][] transform, int[] cost) {
        final int ALPHA = 26;
        final int INF = 1_000_000_000;
        int[][] dist = new int[ALPHA][ALPHA];
        for (int i = 0; i < ALPHA; ++i)
            Arrays.fill(dist[i], INF);
        for (int i = 0; i < ALPHA; ++i)
            dist[i][i] = 0;

        // add direct transforms
        for (int i = 0; i < transform.length; ++i) {
            int u = transform[i][0] - 'a';
            int v = transform[i][1] - 'a';
            dist[u][v] = Math.min(dist[u][v], cost[i]);
        }

        // Floyd-Warshall
        for (int k = 0; k < ALPHA; ++k)
            for (int i = 0; i < ALPHA; ++i)
                if (dist[i][k] < INF)
                    for (int j = 0; j < ALPHA; ++j)
                        if (dist[k][j] < INF)
                            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

        if (s.length() != t.length())
            return -1;
        long ans = 0;
        for (int i = 0; i < s.length(); ++i) {
            char cs = s.charAt(i), ct = t.charAt(i);
            if (cs == ct)
                continue;
            int u = cs - 'a', v = ct - 'a';
            int best = INF;
            for (int c = 0; c < ALPHA; ++c) {
                if (dist[u][c] < INF && dist[v][c] < INF) {
                    best = Math.min(best, dist[u][c] + dist[v][c]);
                }
            }
            if (best == INF)
                return -1;
            ans += best;
            if (ans > Integer.MAX_VALUE)
                return -1; // defensive
        }
        return (int) ans;
    }
}
