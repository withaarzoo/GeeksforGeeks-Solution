import java.util.*;

class Solution {
    public int orangesRot(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;

        // Step 1
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 2)
                    q.offer(new int[] { i, j });
                if (mat[i][j] == 1)
                    fresh++;
            }
        }

        int[] dx = { -1, 1, 0, 0 };
        int[] dy = { 0, 0, -1, 1 };

        int time = 0;

        // Step 2: BFS
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            time++;

            for (int i = 0; i < size; i++) {
                int[] cur = q.poll();
                int x = cur[0], y = cur[1];

                for (int d = 0; d < 4; d++) {
                    int nx = x + dx[d];
                    int ny = y + dy[d];

                    if (nx >= 0 && ny >= 0 && nx < n && ny < m && mat[nx][ny] == 1) {
                        mat[nx][ny] = 2;
                        q.offer(new int[] { nx, ny });
                        fresh--;
                    }
                }
            }
        }

        return fresh == 0 ? time : -1;
    }
}