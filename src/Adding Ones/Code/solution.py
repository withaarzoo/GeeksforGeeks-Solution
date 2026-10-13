class Solution:
    def update(self, n: int, updates: list[int]) -> list[int]:
        arr = [0] * n
        for j in updates:
            arr[j - 1] += 1
        for i in range(1, n):
            arr[i] += arr[i - 1]
        return arr