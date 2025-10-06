/**
 * @param {number} n
 * @returns {number[][]} board or [[-1]] if impossible
 */
class Solution {
  knightTour(n) {
    if (n === 1) return [[0]];
    if (n > 1 && n < 5) return [[-1]]; // impossible sizes

    const board = Array.from({ length: n }, () => Array(n).fill(-1));
    const dr = [2, 1, -1, -2, -2, -1, 1, 2];
    const dc = [1, 2, 2, 1, -1, -2, -2, -1];

    const degree = (r, c) => {
      let cnt = 0;
      for (let k = 0; k < 8; ++k) {
        const nr = r + dr[k],
          nc = c + dc[k];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] === -1)
          cnt++;
      }
      return cnt;
    };

    function dfs(r, c, step) {
      if (step === n * n) return true;
      const moves = [];
      for (let k = 0; k < 8; ++k) {
        const nr = r + dr[k],
          nc = c + dc[k];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] === -1) {
          moves.push([degree(nr, nc), nr, nc]);
        }
      }
      moves.sort((a, b) => a[0] - b[0]); // Warnsdorff: try less-degree moves first
      for (const m of moves) {
        const [_, nr, nc] = m;
        board[nr][nc] = step;
        if (dfs(nr, nc, step + 1)) return true;
        board[nr][nc] = -1;
      }
      return false;
    }

    board[0][0] = 0;
    if (dfs(0, 0, 1)) return board;
    return [[-1]];
  }
}
