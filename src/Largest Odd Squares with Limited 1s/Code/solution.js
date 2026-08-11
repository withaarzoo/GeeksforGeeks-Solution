/**
 * @param {number[][]} mat
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
class Solution {
  largestSquare(mat, queries, k) {
    const n = mat.length; // Number of rows.
    const m = mat[0].length; // Number of columns.

    // Create an extra row and column so prefix-sum
    // calculations work without special boundary cases.
    const prefix = Array.from({ length: n + 1 }, () =>
      new Array(m + 1).fill(0),
    );

    // Build the 2D prefix sum.
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        // Add the current value and the upper/left areas,
        // then subtract the overlapping area counted twice.
        prefix[i][j] =
          mat[i - 1][j - 1] +
          prefix[i - 1][j] +
          prefix[i][j - 1] -
          prefix[i - 1][j - 1];
      }
    }

    // Return the number of 1s inside a rectangle in O(1).
    const getSum = (r1, c1, r2, c2) => {
      // Shift matrix coordinates by one for the prefix array.
      r1++;
      c1++;
      r2++;
      c2++;

      // Apply inclusion-exclusion to get the rectangle sum.
      return (
        prefix[r2][c2] -
        prefix[r1 - 1][c2] -
        prefix[r2][c1 - 1] +
        prefix[r1 - 1][c1 - 1]
      );
    };

    const answer = []; // Store every query result.

    // Process each query independently.
    for (const query of queries) {
      const i = query[0]; // Center row.
      const j = query[1]; // Center column.

      // Find the largest radius that can fit inside the matrix.
      const maxRadius = Math.min(i, j, n - 1 - i, m - 1 - j);

      let low = 0; // Smallest possible radius.
      let high = maxRadius; // Largest possible radius.
      let best = -1; // No valid square found yet.

      // Binary search for the largest valid radius.
      while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        // Calculate the boundaries of the current square.
        const r1 = i - mid;
        const c1 = j - mid;
        const r2 = i + mid;
        const c2 = j + mid;

        // Count the 1s inside this square in O(1).
        const ones = getSum(r1, c1, r2, c2);

        if (ones <= k) {
          // The current square is valid, so save the radius
          // and search for a larger valid square.
          best = mid;
          low = mid + 1;
        } else {
          // Too many 1s means larger radii cannot work.
          high = mid - 1;
        }
      }

      // Convert radius to side length.
      // If best is -1, this evaluates to -1.
      answer.push(2 * best + 1);
    }

    return answer; // Return all answers.
  }
}
