class Solution:
    
    # Returns number of subarrays whose sum is <= limit
    def countAtMost(self, arr, limit):
        
        # No positive subarray can have negative sum
        if limit < 0:
            return 0
        
        left = 0
        current_sum = 0
        ans = 0
        
        # Expand the window
        for right in range(len(arr)):
            
            # Include current element
            current_sum += arr[right]
            
            # Shrink window until it becomes valid
            while current_sum > limit:
                current_sum -= arr[left]
                left += 1
            
            # Every subarray ending at right is valid
            ans += right - left + 1
        
        return ans
    
    def countSubarray(self, arr: list[int], l: int, r: int) -> int:
        # Count subarrays inside the required range
        return self.countAtMost(arr, r) - self.countAtMost(arr, l - 1)