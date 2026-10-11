class Solution:
    def mergeTwoParts(self, arr):
        n = len(arr)
        breakPoint = -1
        for i in range(n - 1):
            if arr[i] > arr[i + 1]:
                breakPoint = i
                break
        if breakPoint == -1:
            return
        temp = [0] * n
        i, j, k = 0, breakPoint + 1, 0
        while i <= breakPoint and j < n:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]
                i += 1
            else:
                temp[k] = arr[j]
                j += 1
            k += 1
        while i <= breakPoint:
            temp[k] = arr[i]
            i += 1
            k += 1
        while j < n:
            temp[k] = arr[j]
            j += 1
            k += 1
        for p in range(n):
            arr[p] = temp[p]