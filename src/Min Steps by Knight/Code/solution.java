class Solution {
    public int minStepToReachTarget(int knightPos[], int targetPos[], int n) {
        int sx = knightPos[0] - 1, sy = knightPos[1] - 1;
        int tx = targetPos[0] - 1, ty = targetPos[1] - 1;
        if (sx == tx && sy == ty) return 0;
        boolean[][] vis = new boolean[n][n];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{sx, sy, 0});
        vis[sx][sy] = true;
        int[] dx = {-2, -2, -1, -1, 1, 1, 2, 2};
        int[] dy = {-1, 1, -2, 2, -2, 2, -1, 1};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int x = cur[0], y = cur[1], steps = cur[2];
            for (int i = 0; i < 8; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                    if (nx == tx && ny == ty) return steps + 1;
                    vis[nx][ny] = true;
                    q.offer(new int[]{nx, ny, steps + 1});
                }
            }
        }
        return -1;
    }
}