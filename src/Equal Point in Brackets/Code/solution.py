class Solution:
    def findIndex(self, s):
        # I count all closing brackets first, because that gives me the
        # initial number of ')' on the right side before any split.
        close_count = 0
        for ch in s:
            if ch == ')':
                close_count += 1

        # This stores how many '(' I have already moved to the left side.
        open_count = 0
        n = len(s)

        # I check every split position from 0 to n.
        for i in range(n + 1):
            # If both counts are equal, this is the first valid split.
            if open_count == close_count:
                return i

            # If I am still inside the string, I move s[i] across the split.
            if i < n:
                if s[i] == '(':
                    open_count += 1   # This opening bracket now belongs to the left side.
                else:
                    close_count -= 1  # This closing bracket is removed from the right side.

        # If no split position works, I return -1.
        return -1