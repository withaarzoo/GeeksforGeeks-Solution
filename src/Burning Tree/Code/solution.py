class Solution:
    def minTime(self, root, target):
        
        from collections import deque
        
        parent = {}
        q = deque([root])
        targetNode = None
        
        # Step 1: Build parent mapping
        while q:
            curr = q.popleft()
            
            if curr.data == target:
                targetNode = curr
            
            if curr.left:
                parent[curr.left] = curr
                q.append(curr.left)
                
            if curr.right:
                parent[curr.right] = curr
                q.append(curr.right)
        
        # Step 2: BFS burn
        visited = set()
        q = deque([targetNode])
        visited.add(targetNode)
        
        time = 0
        
        while q:
            size = len(q)
            burned = False
            
            for _ in range(size):
                curr = q.popleft()
                
                if curr.left and curr.left not in visited:
                    burned = True
                    visited.add(curr.left)
                    q.append(curr.left)
                
                if curr.right and curr.right not in visited:
                    burned = True
                    visited.add(curr.right)
                    q.append(curr.right)
                
                if curr in parent and parent[curr] not in visited:
                    burned = True
                    visited.add(parent[curr])
                    q.append(parent[curr])
            
            if burned:
                time += 1
        
        return time