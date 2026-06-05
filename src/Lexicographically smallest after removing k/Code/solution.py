class Solution:
    def lexicographicallySmallest(self, s, k):
        n = len(s)

        # Check whether n is a power of 2
        if (n & (n - 1)) == 0:
            k //= 2
        else:
            k *= 2

        # If removal is impossible or result becomes empty
        if k >= n:
            return "-1"

        stack = []

        # Build lexicographically smallest string
        for ch in s:

            # Remove larger characters while removals remain
            while stack and k > 0 and stack[-1] > ch:
                stack.pop()
                k -= 1

            stack.append(ch)

        # Remove remaining characters from the end
        while k > 0:
            stack.pop()
            k -= 1

        ans = "".join(stack)

        return "-1" if not ans else ans