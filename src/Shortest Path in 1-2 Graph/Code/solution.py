from collections import deque

class Solution:
    def shortestPath(self, V: int, src: int, dest: int, edges: list[list[int]]) -> int:

        # Total nodes after adding virtual nodes
        total_nodes = V

        # Adjacency list for transformed graph
        adj = [[] for _ in range(V + len(edges))]

        # Build transformed graph
        for u, v, w in edges:

            if w == 1:
                # Normal edge
                adj[u].append(v)
                adj[v].append(u)
            else:
                # Create one virtual node
                new_node = total_nodes
                total_nodes += 1

                # Replace weight 2 edge with two weight 1 edges
                adj[u].append(new_node)
                adj[new_node].append(u)

                adj[new_node].append(v)
                adj[v].append(new_node)

        # Distance array
        dist = [-1] * total_nodes

        # BFS queue
        q = deque()

        q.append(src)
        dist[src] = 0

        while q:

            node = q.popleft()

            for nxt in adj[node]:

                if dist[nxt] == -1:
                    dist[nxt] = dist[node] + 1
                    q.append(nxt)

        # Return shortest distance to destination
        return dist[dest]