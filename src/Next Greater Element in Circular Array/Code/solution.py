class Solution:
    def nextGreater(self, arr):
        n = len(arr)
        result = [-1] * n  # Initialize result array with -1
        stack = []  # Stack to store indices
        
        # Traverse the array twice to handle circular nature
        for i in range(2 * n):
            current_index = i % n  # Get actual array index
            current_element = arr[current_index]
            
            # Pop elements from stack while current element is greater
            while stack and arr[stack[-1]] < current_element:
                index = stack.pop()
                result[index] = current_element  # Found next greater element
            
            # Only push during first pass to avoid duplicates
            if i < n:
                stack.append(current_index)
        
        return result