class Solution:
    def nextFreqGreater(self, arr):
        n = len(arr)
        result = [-1] * n

        # Step 1: Frequency map
        freq = {}
        for x in arr:
            freq[x] = freq.get(x, 0) + 1

        # Step 2: Stack for indices
        stack = []

        # Step 3: Traverse array
        for i in range(n):
            while stack and freq[arr[i]] > freq[arr[stack[-1]]]:
                result[stack.pop()] = arr[i]
            stack.append(i)

        return result
