class Solution {
    public int minSteps(int[] arr, int start, int end) {

        // If start is already equal to end
        if (start == end)
            return 0;

        // Distance array to store minimum steps
        int[] dist = new int[1000];

        // Initialize with large value
        Arrays.fill(dist, (int) 1e9);

        // Queue for BFS
        Queue<Integer> q = new LinkedList<>();

        // Start node
        dist[start] = 0;
        q.offer(start);

        // BFS traversal
        while (!q.isEmpty()) {

            // Get current number
            int current = q.poll();

            // Try all multiplications
            for (int num : arr) {

                // Generate next state
                int next = (current * num) % 1000;

                // If shorter path found
                if (dist[current] + 1 < dist[next]) {

                    // Update distance
                    dist[next] = dist[current] + 1;

                    // If target reached
                    if (next == end)
                        return dist[next];

                    // Push into queue
                    q.offer(next);
                }
            }
        }

        // Not possible to reach end
        return -1;
    }
}