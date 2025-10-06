import java.util.*;

class Solution {
    // instance fields to make helper methods simpler
    int n;
    int[][] board;
    final int[] dr = {2,1,-1,-2,-2,-1,1,2};
    final int[] dc = {1,2,2,1,-1,-2,-2,-1};

    // Return ArrayList<ArrayList<Integer>> board with step indices
    // If no tour exists, return [[-1]] (as an ArrayList-of-ArrayList)
    public ArrayList<ArrayList<Integer>> knightTour(int n) {
        this.n = n;
        if (n == 1) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(0)));
            return res;
        }
        if (n > 1 && n < 5) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(-1)));
            return res;
        }

        board = new int[n][n];
        for (int i = 0; i < n; ++i) Arrays.fill(board[i], -1);

        board[0][0] = 0;
        if (!dfs(0, 0, 1)) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(-1)));
            return res;
        }

        // convert int[][] to ArrayList<ArrayList<Integer>>
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; ++j) row.add(board[i][j]);
            result.add(row);
        }
        return result;
    }

    private int degree(int r, int c) {
        int cnt = 0;
        for (int k = 0; k < 8; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) ++cnt;
        }
        return cnt;
    }

    private boolean dfs(int r, int c, int step) {
        if (step == n * n) return true;

        ArrayList<int[]> moves = new ArrayList<>();
        for (int k = 0; k < 8; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) {
                moves.add(new int[]{degree(nr,nc), nr, nc});
            }
        }
        // sort by degree ascending
        moves.sort(Comparator.comparingInt(a -> a[0]));

        for (int[] m : moves) {
            int nr = m[1], nc = m[2];
            board[nr][nc] = step;
            if (dfs(nr, nc, step + 1)) return true;
            board[nr][nc] = -1; // backtrack
        }
        return false;
    }
}
