class Solution {
  public:
    int minCost(vector<vector<int>>& houses) {
        int n = houses.size();

        // minDist[i] = minimum cost to connect house i
        vector<int> minDist(n, INT_MAX);

        // visited[i] = whether house i is already included in MST
        vector<bool> visited(n, false);

        // Start from house 0
        minDist[0] = 0;

        int totalCost = 0;

        // We need to include all houses in MST
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

            // Update minimum distance for remaining houses
            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    int cost = abs(houses[u][0] - houses[v][0]) +
                               abs(houses[u][1] - houses[v][1]);

                    minDist[v] = min(minDist[v], cost);
                }
            }
        }

        return totalCost;
    }
};