class Solution:
    def subarrayRanges(self, arr):
        n = len(arr)
        max_sum = min_sum = 0
        left = [0] * n
        right = [0] * n
        stack = []

        # ---------- Maximum ----------
        stack.clear()
        for i in range(n):
            while stack and arr[stack[-1]] <= arr[i]:
                stack.pop()
            left[i] = i + 1 if not stack else i - stack[-1]
            stack.append(i)

        stack.clear()
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] < arr[i]:
                stack.pop()
            right[i] = n - i if not stack else stack[-1] - i
            stack.append(i)

        for i in range(n):
            max_sum += arr[i] * left[i] * right[i]

        # ---------- Minimum ----------
        stack.clear()
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = i + 1 if not stack else i - stack[-1]
            stack.append(i)

        stack.clear()
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = n - i if not stack else stack[-1] - i
            stack.append(i)

        for i in range(n):
            min_sum += arr[i] * left[i] * right[i]

        return max_sum - min_sum
