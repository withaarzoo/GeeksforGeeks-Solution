class Solution:
    def commonElements(self, a, b, c):
        ans = []
        i = j = k = 0

        while i < len(a) and j < len(b) and k < len(c):
            x, y, z = a[i], b[j], c[k]

            # Case 1: all three are equal => common element found
            if x == y == z:
                # Avoid duplicates in the answer
                if not ans or ans[-1] != x:
                    ans.append(x)
                i += 1
                j += 1
                k += 1
            # Case 2: move the pointer(s) having the smallest value
            else:
                mn = min(x, y, z)
                if x == mn:
                    i += 1
                if y == mn:
                    j += 1
                if z == mn:
                    k += 1

        return ans