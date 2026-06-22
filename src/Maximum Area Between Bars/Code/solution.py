class Solution:
    def maxArea(self, height):
        n = len(height)          # I store the total number of bars.
        if n < 2:
            return 0             # I need two bars to form any rectangle.

        left = 0                 # I start from the leftmost bar.
        right = n - 1            # I start from the rightmost bar.
        best = 0                 # I keep track of the largest area I have seen.

        while left + 1 < right:  # I stop when the pointers become adjacent, because then the width is 0.
            width = right - left - 1                     # I count only the bars between the two chosen bars.
            current = min(height[left], height[right]) * width  # I use the shorter bar as the height limit.
            if current > best:
                best = current   # I update the answer whenever I find a bigger rectangle.

            if height[left] <= height[right]:
                left += 1        # I move the shorter side inward to try for a taller limiting bar.
            else:
                right -= 1       # I move the right side inward when it is the shorter one.

        return best              # I return the best area found.