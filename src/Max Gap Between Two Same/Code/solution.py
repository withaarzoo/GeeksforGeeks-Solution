class Solution:

    def maxCharGap(self, s: str) -> int:
        # first_pos[i] stores the first index where each letter appeared
        first_pos = [-1] * 26

        # I keep -1 so the answer stays correct if no character repeats
        max_gap = -1

        # I scan the string once from left to right
        for i in range(len(s)):
            # Convert the current lowercase letter into an index from 0 to 25
            index = ord(s[i]) - ord('a')

            # If this is the first occurrence, I store its position
            if first_pos[index] == -1:
                first_pos[index] = i
            else:
                # Subtract 1 because I only count characters between the two matches
                gap = i - first_pos[index] - 1

                # Keep the largest gap found so far
                max_gap = max(max_gap, gap)

        # Returns -1 automatically if no character appeared twice
        return max_gap