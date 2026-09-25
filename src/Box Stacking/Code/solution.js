/**
 * @param {number[]} height
 * @param {number[]} width
 * @param {number[]} length
 * @returns {number}
 */

class Solution {
    maxHeight(height, width, length) {
        const n = height.length;
        const boxes = [];
        for (let i = 0; i < n; i++) {
            const a = height[i], b = width[i], c = length[i];
            boxes.push([Math.max(b, c), Math.min(b, c), a]);
            boxes.push([Math.max(a, c), Math.min(a, c), b]);
            boxes.push([Math.max(a, b), Math.min(a, b), c]);
        }
        boxes.sort((x, y) => {
            if (x[0] !== y[0]) return y[0] - x[0];
            return y[1] - x[1];
        });
        const m = boxes.length;
        const dp = new Array(m);
        let ans = 0;
        for (let i = 0; i < m; i++) {
            dp[i] = boxes[i][2];
            for (let j = 0; j < i; j++) {
                if (boxes[j][0] > boxes[i][0] && boxes[j][1] > boxes[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}