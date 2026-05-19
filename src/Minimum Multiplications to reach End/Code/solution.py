from collections import deque

class Solution:
    def minSteps(self, arr, start, end):
        
        # If start is already equal to end
        if start == end:
            return 0
        
        # Distance array to store minimum steps
        dist = [float('inf')] * 1000
        
        # Queue for BFS
        q = deque()
        
        # Starting node
        dist[start] = 0
        q.append(start)
        
        # BFS traversal
        while q:
            
            # Get current number
            current = q.popleft()
            
            # Try multiplying with every number
            for num in arr:
                
                # Generate next state
                next_num = (current * num) % 1000
                
                # If shorter path found
                if dist[current] + 1 < dist[next_num]:
                    
                    # Update distance
                    dist[next_num] = dist[current] + 1
                    
                    # If end reached
                    if next_num == end:
                        return dist[next_num]
                    
                    # Push into queue
                    q.append(next_num)
        
        # End cannot be reached
        return -1