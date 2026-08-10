class Solution:
    def maxTask(self, h: list[int], l: list[int]) -> int:
        # n represents the total number of available days.
        n = len(h)

        # On day 0, I can choose either high effort or low effort.
        # I take whichever gives more tasks.
        prev1 = max(h[0], l[0])

        # This represents the result before day 0.
        # It acts as dp[-1] = 0.
        prev2 = 0

        # Process every remaining day.
        for i in range(1, n):
            # Choosing low effort today allows me to use yesterday's best result.
            low_choice = prev1 + l[i]

            # Choosing high effort today means yesterday must be skipped.
            high_choice = prev2 + h[i]

            # The better choice is the best result up to the current day.
            current = max(low_choice, high_choice)

            # Shift the previous DP states forward.
            prev2 = prev1
            prev1 = current

        # prev1 contains the maximum total number of tasks.
        return prev1