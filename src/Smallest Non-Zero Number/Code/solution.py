class Solution:
    def find(self, arr):
        # Minimum value needed after processing all elements
        need = 0

        # Traverse from right to left
        for value in reversed(arr):

            # Ceiling of (need + value) / 2
            need = (need + value + 1) // 2

        # Smallest valid starting value
        return need