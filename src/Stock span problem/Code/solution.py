class Solution:
    def calculateSpan(self, arr):
        n = len(arr)
        span = [0] * n
        stack = []  # stores indices

        for i in range(n):
            while stack and arr[stack[-1]] <= arr[i]:
                stack.pop()

            if not stack:
                span[i] = i + 1
            else:
                span[i] = i - stack[-1]

            stack.append(i)

        return span
