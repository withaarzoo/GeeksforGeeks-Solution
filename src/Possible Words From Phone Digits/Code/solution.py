class Solution:
    def __init__(self):
        self.mapping = [
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        ]

    def possibleWords(self, arr):
        res = []
        cur = []

        def dfs(idx):
            if idx == len(arr):
                if cur:  # only add if non-empty
                    res.append("".join(cur))
                return
            d = arr[idx]
            if d < 0 or d > 9:
                return
            letters = self.mapping[d]
            if not letters:  # skip 0 and 1
                dfs(idx + 1)
                return
            for ch in letters:
                cur.append(ch)
                dfs(idx + 1)
                cur.pop()

        dfs(0)
        return res
