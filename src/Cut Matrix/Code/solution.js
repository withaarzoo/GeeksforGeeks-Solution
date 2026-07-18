class Solution {
  findWays(matrix, k) {
    const MOD = 1000000007;

    const rows = matrix.length;
    const cols = matrix[0].length;

    // suffixOnes[r][c] stores the number of 1s in the submatrix
    // starting from (r, c) to the bottom-right corner.
    const suffixOnes = Array.from({ length: rows + 1 }, () =>
      Array(cols + 1).fill(0),
    );

    for (let r = rows - 1; r >= 0; r--) {
      for (let c = cols - 1; c >= 0; c--) {
        suffixOnes[r][c] =
          matrix[r][c] +
          suffixOnes[r + 1][c] +
          suffixOnes[r][c + 1] -
          suffixOnes[r + 1][c + 1];
      }
    }

    // Impossible to create k valid pieces.
    if (suffixOnes[0][0] < k) {
      return 0;
    }

    const nextRow = Array.from({ length: rows }, () => Array(cols).fill(rows));

    const nextCol = Array.from({ length: rows }, () => Array(cols).fill(cols));

    // Find the first valid horizontal cut.
    for (let c = 0; c < cols; c++) {
      for (let r = rows - 1; r >= 0; r--) {
        if (suffixOnes[r][c] > suffixOnes[r + 1][c]) {
          nextRow[r][c] = r + 1;
        } else if (r + 1 < rows) {
          nextRow[r][c] = nextRow[r + 1][c];
        }
      }
    }

    // Find the first valid vertical cut.
    for (let r = 0; r < rows; r++) {
      for (let c = cols - 1; c >= 0; c--) {
        if (suffixOnes[r][c] > suffixOnes[r][c + 1]) {
          nextCol[r][c] = c + 1;
        } else if (c + 1 < cols) {
          nextCol[r][c] = nextCol[r][c + 1];
        }
      }
    }

    let dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

    // Base case: one valid piece.
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (suffixOnes[r][c] > 0) {
          dp[r][c] = 1;
        }
      }
    }

    for (let pieces = 2; pieces <= k; pieces++) {
      const rowSuffix = Array.from({ length: rows + 1 }, () =>
        Array(cols + 1).fill(0),
      );

      const colSuffix = Array.from({ length: rows + 1 }, () =>
        Array(cols + 1).fill(0),
      );

      for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
          rowSuffix[r][c] = (rowSuffix[r + 1][c] + dp[r][c]) % MOD;

          colSuffix[r][c] = (colSuffix[r][c + 1] + dp[r][c]) % MOD;
        }
      }

      const current = Array.from({ length: rows + 1 }, () =>
        Array(cols + 1).fill(0),
      );

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (suffixOnes[r][c] < pieces) {
            continue;
          }

          let ways = 0;

          ways += rowSuffix[nextRow[r][c]][c];
          ways += colSuffix[r][nextCol[r][c]];

          current[r][c] = ways % MOD;
        }
      }

      dp = current;
    }

    return dp[0][0];
  }
}
