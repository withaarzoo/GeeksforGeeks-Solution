class Solution {

    public int minCost(int[][] houses) {
        int n = houses.length;

        // minDist[i] = minimum cost to connect house i
        int[] minDist = new int[n];

        // visited[i] = whether house i is already included in MST
        boolean[] visited = new boolean[n];

        Arrays.fill(minDist, Integer.MAX_VALUE);

        // Start from house 0
        minDist[0] = 0;

        int totalCost = 0;

        // Include all houses in MST
        for (int i = 0; i < n; i++) {

            int u = -1;

            // Find the unvisited house with minimum connection cost
            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || minDist[j] < minDist[u])) {
                    u = j;
                }
            }

            // Include this house in MST
            visited[u] = true;
            totalCost += minDist[u];

            // Update distances for remaining houses
            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    int cost = Math.abs(houses[u][0] - houses[v][0]) +
                            Math.abs(houses[u][1] - houses[v][1]);

                    minDist[v] = Math.min(minDist[v], cost);
                }
            }
        }

        return totalCost;
    }
}