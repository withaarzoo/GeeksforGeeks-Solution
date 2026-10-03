/**
 * @param {number} n
 * @returns {number[][]}
 */

class Solution {
    formCoils(n) {
        let size = 4 * n;
        let m = 8 * n * n;
        let coil1 = new Array(m);
        let x = 0, y = 0;
        coil1[0] = 1;
        let idx = 1;
        let dirs = [[1,0],[0,1],[-1,0],[0,-1]];
        let d = 0;
        let steps = size - 1;
        for (let i = 0; i < steps && idx < m; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1[idx++] = x * size + y + 1;
        }
        d = (d + 1) % 4;
        for (let k = size - 2; k > 0; k -= 2) {
            for (let t = 0; t < 2; t++) {
                for (let i = 0; i < k && idx < m; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1[idx++] = x * size + y + 1;
                }
                d = (d + 1) % 4;
            }
        }
        let coil2 = new Array(m);
        let total = size * size;
        for (let i = 0; i < m; i++)
            coil2[i] = total + 1 - coil1[i];
        return [coil1, coil2];
    }
}