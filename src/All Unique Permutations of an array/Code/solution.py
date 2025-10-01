class Solution:
    def uniquePerms(self, arr):
        """
        :param arr: List[int]
        :return: List[List[int]] all unique permutations
        """
        n = len(arr)
        res = []
        if n == 0:
            res.append([])  # one empty permutation
            return res

        arr.sort()                 # group duplicates
        used = [False] * n
        curr = []

        def dfs():
            if len(curr) == n:
                res.append(curr.copy())  # add a copy of current permutation
                return
            for i in range(n):
                if used[i]:
                    continue
                # skip duplicates: if same as previous and previous isn't used in this branch
                if i > 0 and arr[i] == arr[i-1] and not used[i-1]:
                    continue
                used[i] = True
                curr.append(arr[i])
                dfs()
                curr.pop()
                used[i] = False

        dfs()
        return res
