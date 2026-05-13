class Solution:
    
    # DFS function to visit all reachable nodes
    def dfs(self, node, adj, visited):
        visited[node] = True
        
        # Visit all neighbours
        for neighbor in adj[node]:
            if not visited[neighbor]:
                self.dfs(neighbor, adj, visited)

    def findMotherVertex(self, V, edges):
        
        # Create adjacency list
        adj = [[] for _ in range(V)]
        
        for u, v in edges:
            adj[u].append(v)

        visited = [False] * V
        
        candidate = -1

        # Find possible mother vertex
        for i in range(V):
            if not visited[i]:
                self.dfs(i, adj, visited)
                
                # Last finished node becomes candidate
                candidate = i

        # Reset visited array
        visited = [False] * V

        # Verify candidate
        self.dfs(candidate, adj, visited)

        # Check whether all nodes are reachable
        for i in range(V):
            if not visited[i]:
                return -1

        return candidate