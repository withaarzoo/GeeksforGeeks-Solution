class Solution:
    def maxIndexDifference(self, s):
        # Store the farthest reachable ending index for each letter.
        best = [-1] * 26

        ans = -1

        # Traverse from right to left.
        for i in range(len(s) - 1, -1, -1):

            # Character index (0 -> 'a').
            c = ord(s[i]) - ord('a')

            # 'z' cannot jump further.
            if c == 25:
                reach = i

            # Use the already computed result of the next character.
            elif best[c + 1] != -1:
                reach = best[c + 1]

            # No valid jump exists.
            else:
                reach = i

            # Update the best reachable ending index.
            best[c] = max(best[c], reach)

            # Update answer whenever the current character is 'a'.
            if c == 0:
                ans = max(ans, reach - i)

        return ans