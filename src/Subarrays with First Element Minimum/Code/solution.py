class Solution:
    def countSubarrays(self, arr):
        n = len(arr)
        stack = []
        ans = 0

        for i in range(n - 1, -1, -1):

            # Maintain monotonic stack
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()

            if not stack:
                ans += (n - i)
            else:
                ans += (stack[-1] - i)

            stack.append(i)

        return ans