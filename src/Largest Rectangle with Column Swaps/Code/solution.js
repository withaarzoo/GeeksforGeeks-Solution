/*
 * @param {number[][]} mat
 * @return {number}
 */
class Solution {
  maxArea(mat) {
    // I get the number of rows and columns to size my helper arrays.
    const n = mat.length;
    const m = mat[0].length;

    // I store the consecutive number of 1s ending at the current row
    // for every column.
    const height = new Array(m).fill(0);

    // I keep the largest area found while processing all rows.
    let answer = 0;

    // I treat every row as the possible bottom edge of a rectangle.
    for (let i = 0; i < n; i++) {
      // I count how many columns have every possible height.
      const count = new Array(n + 1).fill(0);

      // I update the height of every column.
      for (let j = 0; j < m; j++) {
        // A 1 continues the vertical block, while a 0 breaks it.
        if (mat[i][j] === 1) {
          height[j]++;
        } else {
          height[j] = 0;
        }

        // I store the frequency so I can avoid comparison sorting.
        count[height[j]]++;
      }

      // I keep the number of columns that can form the current width.
      let width = 0;

      // I process larger heights first because column swaps allow me
      // to place columns with larger heights next to each other.
      for (let h = n; h >= 1; h--) {
        // I add all columns that have this height.
        width += count[h];

        // Height h is the smallest height among the selected columns.
        answer = Math.max(answer, h * width);
      }
    }

    // I return the maximum rectangle area found.
    return answer;
  }
}
