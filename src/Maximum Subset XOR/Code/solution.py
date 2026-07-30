class Solution:
    def maxSubsetXOR(self, arr):

        n = len(arr)

        # Position where the next basis element will be placed
        index = 0

        # Process bits from highest to lowest
        for bit in range(31, -1, -1):

            maxIndex = -1

            # Find an element having the current bit set
            for i in range(index, n):
                if arr[i] & (1 << bit):
                    maxIndex = i
                    break

            # No element found for this bit
            if maxIndex == -1:
                continue

            # Move it into the basis position
            arr[index], arr[maxIndex] = arr[maxIndex], arr[index]

            # Remove the current bit from every other element
            for i in range(n):
                if i != index and (arr[i] & (1 << bit)):
                    arr[i] ^= arr[index]

            index += 1

        # Construct the maximum XOR greedily
        ans = 0

        for i in range(index):
            ans = max(ans, ans ^ arr[i])

        return ans