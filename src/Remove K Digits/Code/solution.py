class Solution:
    def removeKdig(self, s, k):
        stack = []

        for ch in s:
            while stack and k > 0 and stack[-1] > ch:
                stack.pop()
                k -= 1
            stack.append(ch)

        # remove remaining digits
        while k > 0 and stack:
            stack.pop()
            k -= 1

        # remove leading zeros
        result = ''.join(stack).lstrip('0')

        return result if result else "0"
