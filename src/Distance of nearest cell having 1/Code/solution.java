import java.util.*;

class Solution {
    public ArrayList<ArrayList<Integer>> nearest(int[][] grid) {
        int m = grid.length;
        if (m == 0)
            return new ArrayList<>();
        int n = grid[0].length;

        int[][] dist = new int[m][n];
        boolean[][] vis = new boolean[m][n];
        for (int i = 0; i < m; i++)
            Arrays.fill(dist[i], -1);

        Queue<int[]> q = new LinkedList<>();

        // Initialize with all 1s
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dist[i][j] = 0;
                    vis[i][j] = true;
                    q.offer(new int[] { i, j });
                }
            }
        }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        // BFS
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    dist[nr][nc] = dist[r][c] + 1;
                    q.offer(new int[] { nr, nc });
                }
            }
        }

        // Convert to ArrayList<ArrayList<Integer>>
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++)
                row.add(dist[i][j]);
            result.add(row);
        }
        return result;
    }
}
