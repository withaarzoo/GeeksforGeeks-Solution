class Solution {
  transpose(mat) {
    const n = mat.length;
    // swap elements above the diagonal with their symmetric counterparts
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const tmp = mat[i][j];
        mat[i][j] = mat[j][i];
        mat[j][i] = tmp;
      }
    }
    return mat;
  }
}
