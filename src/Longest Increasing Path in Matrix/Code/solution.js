/**
 * @param {number[][]} matrix
 * @param {number} n
 * @param {number} m
 * @return {number}
 */

class Solution {
    longIncPath(matrix, n, m) {
        const memo = Array.from({length: n}, () => Array(m).fill(0));
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        const dfs = (i, j) => {
            if (memo[i][j] !== 0) return memo[i][j];
            let best = 1;
            for (const [di, dj] of dirs) {
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                    best = Math.max(best, 1 + dfs(ni, nj));
                }
            }
            return memo[i][j] = best;
        };
        let ans = 0;
        for (let i = 0; i < n; i++)
            for (let j = 0; j < m; j++)
                ans = Math.max(ans, dfs(i, j));
        return ans;
    }
}