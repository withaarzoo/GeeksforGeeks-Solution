class Solution {
    public int minThrows(int n, int[] lad, int[] sn) {
        int total = n * n; // The last cell of the board is n*n.

        int[] jump = new int[total + 1]; // Stores the destination of every snake or ladder.

        // Store all ladders as direct jumps from their starting cell.
        for (int i = 0; i < lad.length; i += 2) {
            jump[lad[i]] = lad[i + 1]; // From the ladder start, immediately move to its end.
        }

        // Store all snakes as direct jumps from their starting cell.
        for (int i = 0; i < sn.length; i += 2) {
            jump[sn[i]] = sn[i + 1]; // From the snake start, immediately move to its end.
        }

        boolean[] visited = new boolean[total + 1]; // Prevents processing the same cell multiple times.

        Queue<int[]> queue = new ArrayDeque<>(); // BFS queue stores {cell, number of throws}.

        queue.offer(new int[] { 1, 0 }); // Start from cell 1 with zero dice throws.
        visited[1] = true; // Mark the starting cell as visited.

        while (!queue.isEmpty()) {
            int[] current = queue.poll(); // Get the next cell and its distance.
            int cell = current[0]; // Extract the current cell.
            int throwsCount = current[1]; // Extract the number of throws used.

            if (cell == total) {
                return throwsCount; // Reaching the final cell gives the minimum answer.
            }

            // Try every possible dice result from 1 to 6.
            for (int dice = 1; dice <= 6; dice++) {
                int next = cell + dice; // Move forward according to the dice value.

                if (next > total) {
                    continue; // Ignore moves that go beyond the final cell.
                }

                if (jump[next] != 0) {
                    next = jump[next]; // Immediately take the snake or ladder after landing.
                }

                if (!visited[next]) {
                    visited[next] = true; // Mark it before inserting to avoid duplicate states.
                    queue.offer(new int[] { next, throwsCount + 1 }); // This move uses one more throw.
                }
            }
        }

        return -1; // The final cell cannot be reached.
    }
}