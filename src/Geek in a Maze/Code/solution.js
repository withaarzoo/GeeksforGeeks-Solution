/*
 * @param {number} r
 * @param {number} c
 * @param {number} u
 * @param {number} d
 * @param {character[][]} mat
 * @return {number}
 */

class Solution {
  numberOfCells(r, c, u, d, mat) {
    // Store the number of rows and columns.
    const n = mat.length;
    const m = mat[0].length;

    // Geek cannot visit anything if the starting cell is blocked.
    if (mat[r][c] === "#") {
      return 0;
    }

    // INF represents a cell that has not been reached.
    const INF = Number.MAX_SAFE_INTEGER;

    // dist[i * m + j] stores the minimum upward moves for cell (i, j).
    const dist = new Array(n * m).fill(INF);

    // A circular deque is used to support O(1) insertion at both ends.
    // The capacity is enough for all possible queued relaxations in the grid.
    const capacity = 4 * n * m + 5;
    const deque = new Int32Array(capacity);
    let front = 2 * n * m;
    let back = front;

    // Helper function to move an index backward in the circular deque.
    const prevIndex = (index) => (index - 1 + capacity) % capacity;

    // Helper function to move an index forward in the circular deque.
    const nextIndex = (index) => (index + 1) % capacity;

    // Store the starting cell with zero upward moves.
    const start = r * m + c;
    dist[start] = 0;
    deque[back] = start;
    back = nextIndex(back);

    // Direction arrays for up, down, left, and right.
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    // Continue until the deque becomes empty.
    while (front !== back) {
      // Remove a cell from the front.
      const id = deque[front];
      front = nextIndex(front);

      // Convert the one-dimensional index back to row and column.
      const x = Math.floor(id / m);
      const y = id % m;

      // Try all four possible adjacent cells.
      for (let dir = 0; dir < 4; dir++) {
        const nx = x + dr[dir];
        const ny = y + dc[dir];

        // Ignore cells outside the maze.
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
          continue;
        }

        // Ignore obstacles.
        if (mat[nx][ny] === "#") {
          continue;
        }

        // Only moving upward increases the upward move count.
        const cost = dir === 0 ? 1 : 0;
        const nextId = nx * m + ny;

        // Relax the path if this route uses fewer upward moves.
        if (dist[id] + cost < dist[nextId]) {
          dist[nextId] = dist[id] + cost;

          // A cost 0 move goes to the front of the deque.
          if (cost === 0) {
            front = prevIndex(front);
            deque[front] = nextId;
          } else {
            // A cost 1 move goes to the back of the deque.
            deque[back] = nextId;
            back = nextIndex(back);
          }
        }
      }
    }

    // Count all cells that satisfy the upward and downward limits.
    let answer = 0;

    // Check every cell in the maze.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const id = i * m + j;

        // Skip obstacles and unreachable cells.
        if (mat[i][j] === "#" || dist[id] === INF) {
          continue;
        }

        // The shortest path gives the minimum upward moves.
        const upMoves = dist[id];

        // The row difference gives the required downward moves.
        const downMoves = upMoves + (i - r);

        // Count the cell only if both allowed limits are respected.
        if (upMoves <= u && downMoves <= d) {
          answer++;
        }
      }
    }

    // Return the number of valid reachable cells.
    return answer;
  }
}
