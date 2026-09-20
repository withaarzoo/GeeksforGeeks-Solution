/**
 * @param {string[][]} mat
 * @return {number}
 */
class Solution {
    largestSubsquare(mat) {
        let n = mat.length;
        if (n === 0) return 0;
        let hor = Array.from({length: n}, () => Array(n).fill(0));
        let ver = Array.from({length: n}, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 'X') {
                    hor[i][j] = (j === 0) ? 1 : hor[i][j - 1] + 1;
                    ver[i][j] = (i === 0) ? 1 : ver[i - 1][j] + 1;
                }
            }
        }
        let ans = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 'X') {
                    let maxSide = Math.min(hor[i][j], ver[i][j]);
                    for (let s = maxSide; s > ans; s--) {
                        if (hor[i - s + 1][j] >= s && ver[i][j - s + 1] >= s) {
                            ans = s;
                            break;
                        }
                    }
                }
            }
        }
        return ans;
    }
}