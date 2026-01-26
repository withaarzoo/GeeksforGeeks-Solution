class Solution:
    def permuteDist(self, arr):
        result = []
        used = [False] * len(arr)

        def backtrack(curr):
            if len(curr) == len(arr):
                result.append(curr[:])
                return

            for i in range(len(arr)):
                if used[i]:
                    continue

                used[i] = True
                curr.append(arr[i])

                backtrack(curr)

                # Backtrack
                curr.pop()
                used[i] = False

        backtrack([])
        return result
