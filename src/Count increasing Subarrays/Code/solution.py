class Solution:
    def countIncreasing(self, arr):
        # Final answer
        ans = 0
        
        # Length of current increasing segment
        length = 1
        
        # Traverse the array
        for i in range(1, len(arr)):
            
            # If current element is greater than previous
            if arr[i] > arr[i - 1]:
                length += 1
                
                # Add new increasing subarrays ending here
                ans += (length - 1)
            else:
                # Reset if increasing order breaks
                length = 1
        
        return ans