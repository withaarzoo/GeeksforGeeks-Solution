class Solution:
    
    # Function to calculate GCD
    def gcd(self, a, b):
        while b:
            a, b = b, a % b
        return a
    
    # Simulate pouring from one jug to another
    def pour(self, fromCap, toCap, d):
        fromJug = fromCap
        toJug = 0
        steps = 1  # Filling source jug
        
        while fromJug != d and toJug != d:
            
            # Pour water from source to target
            transfer = min(fromJug, toCap - toJug)
            toJug += transfer
            fromJug -= transfer
            steps += 1
            
            # If answer found
            if fromJug == d or toJug == d:
                break
            
            # Refill source jug if empty
            if fromJug == 0:
                fromJug = fromCap
                steps += 1
            
            # Empty target jug if full
            if toJug == toCap:
                toJug = 0
                steps += 1
        
        return steps
    
    def minSteps(self, m, n, d):
        
        # Impossible case
        if d > max(m, n):
            return -1
        
        # d must be divisible by gcd
        if d % self.gcd(m, n) != 0:
            return -1
        
        # Try both directions and return minimum
        return min(self.pour(m, n, d), self.pour(n, m, d))