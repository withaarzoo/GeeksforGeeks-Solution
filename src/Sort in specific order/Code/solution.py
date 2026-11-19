class Solution:
    def sortIt(self, arr):
        arr.sort(key=lambda x: (x % 2 == 0, -x if x % 2 else x))