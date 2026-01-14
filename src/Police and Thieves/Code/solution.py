class Solution:
    def catchThieves(self, arr, k):
        police = []
        thieves = []

        # Store positions
        for i in range(len(arr)):
            if arr[i] == 'P':
                police.append(i)
            else:
                thieves.append(i)

        i = j = count = 0

        # Two pointer greedy approach
        while i < len(police) and j < len(thieves):
            if abs(police[i] - thieves[j]) <= k:
                count += 1
                i += 1
                j += 1
            elif thieves[j] < police[i]:
                j += 1
            else:
                i += 1

        return count
