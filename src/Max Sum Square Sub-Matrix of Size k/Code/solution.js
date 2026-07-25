class Solution {
    maximumSum(mat, k) {

        const n = mat.length;

        // Prefix sum matrix
        const prefix = Array.from({ length: n }, () => Array(n).fill(0));

        // Build the prefix sum matrix
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add top value
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add left value
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove overlap
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store maximum answer
        let ans = -Infinity;

        // Check every possible k x k square
        for (let i = k - 1; i < n; i++) {
            for (let j = k - 1; j < n; j++) {

                // Top-left corner
                const r = i - k + 1;
                const c = j - k + 1;

                // Current square sum
                let sum = prefix[i][j];

                // Remove upper part
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove left part
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add overlap
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update answer
                ans = Math.max(ans, sum);
            }
        }

        return ans;
    }
}