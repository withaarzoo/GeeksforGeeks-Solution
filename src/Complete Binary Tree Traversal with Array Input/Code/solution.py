class Solution:
    def levelSort(self, arr):
        # Store the final answer
        ans = []

        # Current index in the array
        index = 0

        # Number of nodes in the current level
        level_size = 1

        # Continue until all elements are processed
        while index < len(arr):

            # Store one level
            level = []

            # Take at most level_size elements
            for _ in range(level_size):
                if index >= len(arr):
                    break

                level.append(arr[index])
                index += 1

            # Sort only the current level
            level.sort()

            # Save it
            ans.append(level)

            # Next level contains twice as many nodes
            level_size *= 2

        # Return the final answer
        return ans