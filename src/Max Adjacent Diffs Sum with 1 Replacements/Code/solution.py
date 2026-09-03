class Solution:
    def maxDiffSum(self, arr):
        # keep stores the best sum when the previous element is kept unchanged.
        keep = 0

        # replace stores the best sum when the previous element is replaced by 1.
        replace = 0

        # Start from the second element because the first element has no previous neighbor.
        for i in range(1, len(arr)):
            # Calculate the best sum if the current element is kept unchanged.
            # The previous element can either be kept or replaced by 1.
            new_keep = max(
                keep + abs(arr[i] - arr[i - 1]),
                replace + abs(arr[i] - 1)
            )

            # Calculate the best sum if the current element is replaced by 1.
            # Keeping the previous element gives |1 - arr[i-1]|.
            # Replacing both elements gives |1 - 1| = 0.
            new_replace = max(
                keep + abs(1 - arr[i - 1]),
                replace
            )

            # Update both states for the next element.
            keep = new_keep
            replace = new_replace

        # The final element can be kept or replaced, so return the better state.
        return max(keep, replace)