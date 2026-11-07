class Solution:
    def generateUsernames(self, arr: list[str]) -> list[str]:
        reserved = set(arr)
        assigned = set()
        res = []
        for name in arr:
            if name not in assigned:
                assigned.add(name)
                res.append(name)
            else:
                k = 1
                while True:
                    cand = name + str(k)
                    if cand not in assigned and cand not in reserved:
                        assigned.add(cand)
                        res.append(cand)
                        break
                    k += 1
        return res