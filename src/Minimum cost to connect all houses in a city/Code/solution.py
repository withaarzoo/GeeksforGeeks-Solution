#User function Template for python3
class Solution:
    def minCost(self, houses):
        n = len(houses)

        # minDist[i] = minimum cost to connect house i
        minDist = [float('inf')] * n

        # visited[i] = whether house i is already included in MST
        visited = [False] * n

        # Start from house 0
        minDist[0] = 0

        totalCost = 0

        # Include all houses in MST
        for _ in range(n):

            u = -1

            # Find the unvisited house with minimum connection cost
            for i in range(n):
                if not visited[i] and (u == -1 or minDist[i] < minDist[u]):
                    u = i

            # Include this house in MST
            visited[u] = True
            totalCost += minDist[u]

            # Update distances for remaining houses
            for v in range(n):
                if not visited[v]:
                    cost = abs(houses[u][0] - houses[v][0]) + \
                           abs(houses[u][1] - houses[v][1])

                    minDist[v] = min(minDist[v], cost)

        return totalCost