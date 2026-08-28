/**
 * @param {number[][]} mat
 * @return {number}
 */
class Solution {
  minCost(mat) {
    // I store the minimum costs for all three choices in the first row.
    let prev0 = mat[0][0];
    let prev1 = mat[0][1];
    let prev2 = mat[0][2];

    // I process every row starting from the second row.
    for (let i = 1; i < mat.length; i++) {
      // I cannot repeat choice 0, so I come from choice 1 or 2.
      const curr0 = mat[i][0] + Math.min(prev1, prev2);

      // I cannot repeat choice 1, so I come from choice 0 or 2.
      const curr1 = mat[i][1] + Math.min(prev0, prev2);

      // I cannot repeat choice 2, so I come from choice 0 or 1.
      const curr2 = mat[i][2] + Math.min(prev0, prev1);

      // I update the previous-row costs for processing the next row.
      prev0 = curr0;
      prev1 = curr1;
      prev2 = curr2;
    }

    // I return the cheapest valid selection ending with any of the three choices.
    return Math.min(prev0, prev1, prev2);
  }
}
