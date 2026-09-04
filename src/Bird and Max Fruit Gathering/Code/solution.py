class Solution:

    def maxFruits(self, arr: list[int], m: int) -> int:
        """Find the maximum fruit value from at most m consecutive circular trees."""

        n = len(arr)                          # Store the number of trees.
        k = min(m, n)                         # We cannot use more than n trees.

        window_sum = 0                        # Store the current window sum.

        # Build the first window containing k consecutive trees.
        for i in range(k):
            window_sum += arr[i]              # Add the fruit value to the window.

        ans = window_sum                      # The first window is our initial maximum.

        # Move the window to every other starting position on the circle.
        for start in range(1, n):
            removed = start - 1               # This tree leaves the current window.

            # Modulo wraps around to the beginning when necessary.
            added = (start + k - 1) % n

            window_sum -= arr[removed]        # Remove the old first tree.
            window_sum += arr[added]          # Add the new last tree.

            ans = max(ans, window_sum)        # Keep the best window found so far.

        return ans                            # Return the maximum fruit value.