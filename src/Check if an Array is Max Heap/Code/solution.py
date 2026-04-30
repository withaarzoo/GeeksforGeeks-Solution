class Solution:
    def isMaxHeap(self, arr):
        n = len(arr)  # total number of elements
        
        # Check only non-leaf nodes
        for i in range((n // 2)):
            
            left = 2*i + 1   # left child index
            right = 2*i + 2  # right child index
            
            # Check left child
            if left < n and arr[i] < arr[left]:
                return False
            
            # Check right child
            if right < n and arr[i] < arr[right]:
                return False
        
        return True  # valid max heap