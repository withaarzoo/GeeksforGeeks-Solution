class Solution:
    def maxPeopleDefeated(self, p):
        
        # Binary search range
        low = 0
        high = 10000
        
        # Stores maximum valid answer
        ans = 0
        
        while low <= high:
            
            # Middle point
            mid = (low + high) // 2
            
            # Sum of squares:
            # 1^2 + 2^2 + ... + mid^2
            total = mid * (mid + 1) * (2 * mid + 1) // 6
            
            # If current count is possible
            if total <= p:
                ans = mid       # Save answer
                low = mid + 1   # Try larger count
            else:
                high = mid - 1  # Need smaller count
        
        return ans