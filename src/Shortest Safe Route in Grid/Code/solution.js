
/**
 * @param {number[][]} mat
 * @return {number}
 */
class Solution {
    shortestPath(mat) {
        const n = mat.length;                       // Number of rows.
        const m = mat[0].length;                    // Number of columns.

        const unsafe = Array.from(
            { length: n },
            () => Array(m).fill(false)
        );
        // unsafe[r][c] tells me whether this cell cannot be used.

        const dr = [-1, 1, 0, 0];
        // Row changes for up, down, left, and right.

        const dc = [0, 0, -1, 1];
        // Column changes for up, down, left, and right.

        // I first mark every landmine and its four direct neighbors as unsafe.
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (mat[r][c] === 0) {
                    unsafe[r][c] = true;
                    // The landmine itself cannot be used.

                    for (let d = 0; d < 4; d++) {
                        const nr = r + dr[d];
                        const nc = c + dc[d];
                        // Calculate one neighboring position.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = true;
                            // A direct neighbor of a landmine is also unsafe.
                        }
                    }
                }
            }
        }

        const visited = Array.from(
            { length: n },
            () => Array(m).fill(false)
        );
        // visited prevents the same cell from entering BFS more than once.

        const queue = [];
        let head = 0;
        // I use a pointer instead of shift(), because shift() is O(n).

        // Every safe cell in the first column is a possible starting point.
        // The starting cell counts, so its route length is 1.
        for (let r = 0; r < n; r++) {
            if (mat[r][0] === 1 && !unsafe[r][0]) {
                queue.push([r, 0, 1]);
                // Start with route length 1 because the starting cell is counted.

                visited[r][0] = true;
                // Mark immediately to prevent duplicate entries.
            }
        }

        // BFS processes routes in increasing order of their length.
        while (head < queue.length) {
            const [r, c, dist] = queue[head++];
            // Read the next BFS state.

            if (c === m - 1) {
                return dist;
                // The first last-column cell reached has the shortest route.
            }

            // Try moving in all four directions.
            for (let d = 0; d < 4; d++) {
                const nr = r + dr[d];
                const nc = c + dc[d];
                // Calculate the next cell.

                if (
                    nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] === 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]
                ) {
                    visited[nr][nc] = true;
                    // Mark before inserting so this cell is queued only once.

                    queue.push([nr, nc, dist + 1]);
                    // Moving to the next cell increases the route length by one.
                }
            }
        }

        return -1;
        // No safe route reaches the rightmost column.
    }
};
