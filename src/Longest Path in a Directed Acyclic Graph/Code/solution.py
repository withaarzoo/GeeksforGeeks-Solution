class Solution:
    def maxDistance(self, V, src, edges):
        # I store outgoing edges as (destination, weight).
        adj = [[] for _ in range(V)]

        # I keep the number of incoming edges for every vertex.
        indegree = [0] * V

        # I build the adjacency list and calculate indegrees.
        for u, v, w in edges:
            # Store the edge u -> v with weight w.
            adj[u].append((v, w))

            # v has one more incoming edge.
            indegree[v] += 1

        # I use a list as a queue for Kahn's topological sorting.
        queue = []

        # Every vertex with zero incoming edges can come first.
        for i in range(V):
            if indegree[i] == 0:
                queue.append(i)

        # This pointer lets me use the list as a queue in O(1) per operation.
        front = 0

        # I will store the topological ordering here.
        topo = []

        # I generate the topological order.
        while front < len(queue):
            u = queue[front]
            front += 1

            # Add the current vertex to the ordering.
            topo.append(u)

            # Process every outgoing edge from u.
            for v, _ in adj[u]:
                # One incoming edge of v has been processed.
                indegree[v] -= 1

                # v is ready when no incoming edge remains.
                if indegree[v] == 0:
                    queue.append(v)

        # I use negative infinity to represent an unreachable vertex.
        dist = [float('-inf')] * V

        # The distance from the source to itself is 0.
        dist[src] = 0

        # I process vertices in topological order.
        for u in topo:
            # I cannot relax edges from a vertex that cannot be reached.
            if dist[u] == float('-inf'):
                continue

            # Try every outgoing edge from u.
            for v, w in adj[u]:
                # Keep the largest distance reaching v.
                dist[v] = max(dist[v], dist[u] + w)

        # Convert unreachable vertices to INT_MIN as required by the problem.
        for i in range(V):
            if dist[i] == float('-inf'):
                dist[i] = -2147483648

        # Return the longest distance from src to every vertex.
        return dist