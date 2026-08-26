class Solution:
    def isNegativeWeightCycle(self, V: int, edges: list[list[int]]) -> bool:
        # I start every distance at 0 so negative cycles in disconnected
        # components are also detected without choosing a single source.
        dist = [0] * V

        # I relax every edge V - 1 times because a simple path
        # can use at most V - 1 edges.
        for _ in range(V - 1):
            updated = False

            # I process each directed edge [u, v, w].
            for u, v, w in edges:
                # If going through u gives v a smaller value,
                # I update dist[v] using the Bellman-Ford relaxation rule.
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    updated = True

            # If no value changed, the distances are already stable,
            # so I stop early instead of doing unnecessary rounds.
            if not updated:
                break

        # I check all edges one more time. Any improvement now
        # proves that a negative-weight cycle exists.
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                return True

        # If no edge can reduce a value further, no negative cycle exists.
        return False