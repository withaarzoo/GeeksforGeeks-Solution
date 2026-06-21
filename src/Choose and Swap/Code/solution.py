class Solution:
    def chooseSwap(self, s):
        n = len(s)

        # Stores first occurrence of every character
        first = [-1] * 26

        # Record first occurrence
        for i, ch in enumerate(s):
            idx = ord(ch) - ord('a')

            if first[idx] == -1:
                first[idx] = i

        arr = list(s)

        # Find earliest beneficial swap
        for i in range(n):

            # Check all smaller characters
            for ch in range(ord(arr[i]) - ord('a')):

                # Smaller character exists later
                if first[ch] > i:

                    c1 = arr[i]
                    c2 = chr(ch + ord('a'))

                    # Swap all occurrences globally
                    for j in range(n):

                        if arr[j] == c1:
                            arr[j] = c2
                        elif arr[j] == c2:
                            arr[j] = c1

                    return "".join(arr)

        return s