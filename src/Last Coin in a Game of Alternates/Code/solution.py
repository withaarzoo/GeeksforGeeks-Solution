class Solution:
    def coin(self, arr):
        
        # Pointer at the beginning
        left = 0
        
        # Pointer at the end
        right = len(arr) - 1

        # Continue until one coin remains
        while left < right:
            
            # Remove larger coin from left side
            if arr[left] > arr[right]:
                left += 1
            else:
                
                # Otherwise remove right coin
                right -= 1

        # Remaining coin
        return arr[left]