class Solution:
    def segregate0and1(self, arr):
        left = 0
        right = len(arr) - 1

        # Continue until both pointers cross each other
        while left < right:

            # Move left pointer if current value is 0
            while left < right and arr[left] == 0:
                left += 1

            # Move right pointer if current value is 1
            while left < right and arr[right] == 1:
                right -= 1

            # Swap misplaced values
            if left < right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1