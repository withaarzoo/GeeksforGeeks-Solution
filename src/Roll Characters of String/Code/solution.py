class Solution:
    def findRollOut(self, s, roll):
        n = len(s)
        freq = [0] * (n + 1)
        for x in roll:
            freq[x] += 1
        for i in range(n - 1, 0, -1):
            freq[i] += freq[i + 1]
        arr = list(s)
        for i in range(n):
            shift = freq[i + 1] % 26
            arr[i] = chr((ord(arr[i]) - 97 + shift) % 26 + 97)
        return ''.join(arr)