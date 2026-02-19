class Solution:
    def missingRange(self, arr, low, high):
        # result list
        result = []
        # set of present numbers that are within [low, high]
        present = set()
        for x in arr:
            if low <= x <= high:
                present.add(x)

        # iterate the whole range and pick numbers not in present
        v = low
        while v <= high:
            if v not in present:
                result.append(v)
            v += 1
        return result
