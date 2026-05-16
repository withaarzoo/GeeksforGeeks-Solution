class Solution:
    def findSmallest(self, arr):

        # Sort the array first
        arr.sort()

        # Smallest value that cannot be formed
        smallestMissing = 1

        # Traverse every number
        for num in arr:

            # If current number creates a gap,
            # smallestMissing cannot be formed
            if num > smallestMissing:
                break

            # Otherwise extend reachable range
            smallestMissing += num

        # Final answer
        return smallestMissing