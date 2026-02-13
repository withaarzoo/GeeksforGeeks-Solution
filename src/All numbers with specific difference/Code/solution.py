class Solution:
    
    # Function to compute digit sum
    def digitSum(self, x):
        total = 0
        while x > 0:
            total += x % 10
            x //= 10
        return total
    
    def getCount(self, n, d):
        left, right = 1, n
        ans = -1
        
        # Binary Search
        while left <= right:
            mid = (left + right) // 2
            
            if mid - self.digitSum(mid) >= d:
                ans = mid
                right = mid - 1
            else:
                left = mid + 1
        
        if ans == -1:
            return 0
        
        return n - ans + 1
