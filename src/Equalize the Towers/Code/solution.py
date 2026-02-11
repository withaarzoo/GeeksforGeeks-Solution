class Solution:
    def minCost(self, heights, cost):
        
        n = len(heights)
        
        # Pair height and cost
        towers = list(zip(heights, cost))
        
        # Sort by height
        towers.sort()
        
        # Total weight
        total_weight = sum(c for _, c in towers)
        
        curr_weight = 0
        target_height = 0
        
        # Find weighted median
        for h, c in towers:
            curr_weight += c
            if curr_weight * 2 >= total_weight:
                target_height = h
                break
        
        # Compute result
        result = 0
        for h, c in towers:
            result += abs(h - target_height) * c
        
        return result
