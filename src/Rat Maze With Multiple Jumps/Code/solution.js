class Solution {
  shortestDist(mat) {
    const n = mat.length;
    // Create an n x n matrix filled with zeros for the answer
    const ans = Array.from({ length: n }, () => Array(n).fill(0));

    // Inner recursive function to keep track of state
    const solve = (i, j) => {
      // If we hit the bottom-right corner, we found the path
      if (i === n - 1 && j === n - 1) {
        ans[i][j] = 1;
        return true;
      }

      // If we go off the grid or land on a 0, the path is invalid
      if (i >= n || j >= n || mat[i][j] === 0) {
        return false;
      }

      // Assume this cell is part of the final answer
      ans[i][j] = 1;
      const jumps = mat[i][j];

      // Try jumping right, then down, for each jump length
      for (let k = 1; k <= jumps; k++) {
        if (solve(i, j + k)) return true;
        if (solve(i + k, j)) return true;
      }

      // If we exit the loop, no jump worked. Undo the assumption.
      ans[i][j] = 0;
      // Mark the cell in the input as 0 to avoid checking it again later
      mat[i][j] = 0;

      return false;
    };

    // Start from cell (0,0)
    if (solve(0, 0)) {
      return ans;
    }

    // Return [[-1]] as requested if nothing works
    return [[-1]];
  }
}
