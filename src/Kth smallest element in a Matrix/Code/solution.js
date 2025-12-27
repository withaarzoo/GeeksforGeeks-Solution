class Solution {
  kthSmallest(mat, k) {
    const n = mat.length;

    let low = mat[0][0];
    let high = mat[n - 1][n - 1];

    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      let count = 0;

      let col = n - 1;
      for (let row = 0; row < n; row++) {
        while (col >= 0 && mat[row][col] > mid) {
          col--;
        }
        count += col + 1;
      }

      if (count < k) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }
}
