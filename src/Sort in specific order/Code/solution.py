class Solution:
    def sortIt(self, arr):
        odd = []
        even = []

        # Separate odd and even numbers
        for x in arr:
            if x % 2 == 1:
                odd.append(x)
            else:
                even.append(x)

        # Sort odd in descending order
        odd.sort(reverse=True)

        # Sort even in ascending order
        even.sort()

        # Merge back into original array
        idx = 0
        for x in odd:
            arr[idx] = x
            idx += 1
        for x in even:
            arr[idx] = x
            idx += 1
