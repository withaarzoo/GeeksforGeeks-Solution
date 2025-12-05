from typing import List

class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        n = len(costs)
        if n == 0:
            return 0
        k = len(costs[0])
        
        # If only one color and more than 1 wall -> impossible
        if k == 1:
            if n == 1:
                return costs[0][0]
            return -1
        
        # prev[j] = min cost to paint up to previous wall with color j
        prev = [0] * k
        curr = [0] * k
        
        # Base case: first wall
        for j in range(k):
            prev[j] = costs[0][j]
        
        # Process remaining walls
        for i in range(1, n):
            # Find smallest and second smallest in prev
            min1 = float('inf')
            min2 = float('inf')
            idx1 = -1
            idx2 = -1
            
            for j in range(k):
                val = prev[j]
                if val < min1:
                    min2 = min1
                    idx2 = idx1
                    min1 = val
                    idx1 = j
                elif val < min2:
                    min2 = val
                    idx2 = j
            
            # Compute current row
            for j in range(k):
                # If I choose the color that had min1 before, I must use min2
                best_prev = min2 if j == idx1 else min1
                curr[j] = costs[i][j] + best_prev
            
            # Move curr to prev
            prev, curr = curr, prev
        
        # Final answer is min value in prev
        return min(prev)
