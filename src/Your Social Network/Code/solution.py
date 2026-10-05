class Solution:
    def socialNetwork(self, arr):
        n = len(arr) + 1
        parent = [-1] * (n + 1)
        for i in range(2, n + 1):
            parent[i] = arr[i - 2]
        res = []
        for i in range(2, n + 1):
            reaches = []
            curr = i
            dist = 0
            while parent[curr] != -1:
                curr = parent[curr]
                dist += 1
                reaches.append((curr, dist))
            reaches.sort()
            for j, k in reaches:
                res.append([i, j, k])
        return res