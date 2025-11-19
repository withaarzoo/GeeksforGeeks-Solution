import java.util.*;

class Solution {
    public int minCostPath(int[][] mat) {
        int n = mat.length;
        if (n == 0)
            return 0;
        int m = mat[0].length;
        if (n == 1 && m == 1)
            return 0;

        final int INF = Integer.MAX_VALUE / 2;
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; ++i)
            Arrays.fill(dist[i], INF);

        // PriorityQueue of int[]{cost, r, c}
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        dist[0][0] = 0;
        pq.offer(new int[] { 0, 0, 0 });

        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int cost = top[0], r = top[1], c = top[2];
            if (cost != dist[r][c])
                continue;
            if (r == n - 1 && c == m - 1)
                return cost;
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;
                int edge = Math.abs(mat[r][c] - mat[nr][nc]);
                int newCost = Math.max(cost, edge);
                if (newCost < dist[nr][nc]) {
                    dist[nr][nc] = newCost;
                    pq.offer(new int[] { newCost, nr, nc });
                }
            }
        }
        return dist[n - 1][m - 1];
    }
}
