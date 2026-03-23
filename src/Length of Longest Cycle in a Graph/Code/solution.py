class Solution:
    def longestCycle(self, V, edges):
        adj = [-1] * V
        
        for u, v in edges:
            adj[u] = v
        
        visited = [False] * V
        max_cycle = -1
        
        for i in range(V):
            if visited[i]:
                continue
            
            mp = {}  # node -> step
            node = i
            step = 0
            
            while node != -1:
                if node in mp:
                    cycle_len = step - mp[node]
                    max_cycle = max(max_cycle, cycle_len)
                    break
                
                if visited[node]:
                    break
                
                mp[node] = step
                visited[node] = True
                step += 1
                node = adj[node]
        
        return max_cycle