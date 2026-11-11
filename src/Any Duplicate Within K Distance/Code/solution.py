class Solution:
    def checkWithinK(self, arr: list[int], k: int) -> bool:
        window = set()
        for i in range(len(arr)):
            if arr[i] in window:
                return True
            window.add(arr[i])
            if len(window) > k:
                window.remove(arr[i - k])
        return False