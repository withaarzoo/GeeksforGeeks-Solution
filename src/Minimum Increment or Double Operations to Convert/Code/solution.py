class Solution:
    def countMinOperations(self, arr):

        # Stores total increment operations
        increments = 0

        # Stores the largest element
        max_value = 0

        # Process every element
        for num in arr:

            # Count set bits using binary representation
            increments += bin(num).count("1")

            # Update maximum value
            max_value = max(max_value, num)

        # Counts doubling operations
        doubles = 0

        # Every division by 2 represents
        # one doubling operation in forward direction
        while max_value > 1:
            max_value //= 2
            doubles += 1

        # Return total operations
        return increments + doubles