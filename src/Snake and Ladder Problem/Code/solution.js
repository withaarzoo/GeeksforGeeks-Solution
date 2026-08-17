class Solution {
    minThrows(n, lad, sn) {
        const total = n * n; // The last cell of the board is n*n.

        const jump = new Array(total + 1).fill(0); // Stores the destination of every snake or ladder.

        // Store all ladders as direct jumps from their starting cell.
        for (let i = 0; i < lad.length; i += 2) {
            jump[lad[i]] = lad[i + 1]; // From the ladder start, immediately move to its end.
        }

        // Store all snakes as direct jumps from their starting cell.
        for (let i = 0; i < sn.length; i += 2) {
            jump[sn[i]] = sn[i + 1]; // From the snake start, immediately move to its end.
        }

        const visited = new Array(total + 1).fill(false); // Prevents processing the same cell again.

        const queue = [[1, 0]]; // BFS queue stores [cell, number of throws used].
        let head = 0; // Using a head index avoids the costly shift() operation.

        visited[1] = true; // Mark the starting cell as visited.

        while (head < queue.length) {
            const [cell, throws] = queue[head++]; // Read the next BFS state.

            if (cell === total) {
                return throws; // Reaching the final cell gives the minimum answer.
            }

            // Try every possible dice result from 1 to 6.
            for (let dice = 1; dice <= 6; dice++) {
                let next = cell + dice; // Move forward according to the dice value.

                if (next > total) {
                    continue; // Ignore moves that go beyond the final cell.
                }

                if (jump[next] !== 0) {
                    next = jump[next]; // Immediately take the snake or ladder after landing.
                }

                if (!visited[next]) {
                    visited[next] = true; // Mark it before adding it to avoid duplicates.
                    queue.push([next, throws + 1]); // This move requires one additional throw.
                }
            }
        }

        return -1; // The final cell cannot be reached.
    }
};