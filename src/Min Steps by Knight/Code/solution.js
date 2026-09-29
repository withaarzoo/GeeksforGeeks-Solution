/**
 * @param {number[]} knightPos
 * @param {number[]} targetPos
 * @param {number} n
 * @returns {number}
 */

class Solution {
    minStepToReachTarget(knightPos, targetPos, n) {
        let sx = knightPos[0] - 1, sy = knightPos[1] - 1;
        let tx = targetPos[0] - 1, ty = targetPos[1] - 1;
        if (sx === tx && sy === ty) return 0;
        let vis = Array.from({length: n}, () => Array(n).fill(false));
        let q = [[sx, sy, 0]];
        vis[sx][sy] = true;
        let dx = [-2, -2, -1, -1, 1, 1, 2, 2];
        let dy = [-1, 1, -2, 2, -2, 2, -1, 1];
        while (q.length > 0) {
            let [x, y, steps] = q.shift();
            for (let i = 0; i < 8; i++) {
                let nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                    if (nx === tx && ny === ty) return steps + 1;
                    vis[nx][ny] = true;
                    q.push([nx, ny, steps + 1]);
                }
            }
        }
        return -1;
    }
}