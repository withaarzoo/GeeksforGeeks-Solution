/**
 * @param {number[][]} mat
 * @returns {number}
 */

class Solution {
    findPerimeter(mat) {
        let n = mat.length;
        let m = mat[0].length;
        let peri = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (mat[i][j] === 1) {
                    peri += 4;
                    if (j + 1 < m && mat[i][j + 1] === 1) peri -= 2;
                    if (i + 1 < n && mat[i + 1][j] === 1) peri -= 2;
                }
            }
        }
        return peri;
    }
}