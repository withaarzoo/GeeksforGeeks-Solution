/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @param {number[][]} arr
 * @returns {number}
 */
class Solution {
  largestArea(n, m, k, arr) {
    // I start with imaginary boundaries before the grid.
    const rows = [0];
    const cols = [0];

    // I separate blocked row positions from blocked column positions.
    for (let i = 0; i < k; i++) {
      rows.push(arr[i][0]);
      cols.push(arr[i][1]);
    }

    // I add imaginary boundaries just after the grid.
    rows.push(n + 1);
    cols.push(m + 1);

    // Numeric comparators are needed because default JavaScript
    // sorting compares values as strings.
    rows.sort((a, b) => a - b);
    cols.sort((a, b) => a - b);

    let maxRows = 0;
    let maxCols = 0;

    // I calculate every continuous free row gap.
    for (let i = 1; i < rows.length; i++) {
      const freeRows = rows[i] - rows[i - 1] - 1;
      maxRows = Math.max(maxRows, freeRows);
    }

    // I calculate every continuous free column gap.
    for (let i = 1; i < cols.length; i++) {
      const freeCols = cols[i] - cols[i - 1] - 1;
      maxCols = Math.max(maxCols, freeCols);
    }

    // The best row gap and column gap together form the largest rectangle.
    return maxRows * maxCols;
  }
}
