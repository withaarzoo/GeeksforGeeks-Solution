class Solution:
    def maxPeople(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        next_ge = [n] * n   # default n => no greater/equal to right
        prev_ge = [-1] * n  # default -1 => no greater/equal to left
        st = []

        # next_ge: nearest index to right with height >= arr[i]
        for i in range(n):
            while st and arr[i] >= arr[st[-1]]:
                idx = st.pop()
                next_ge[idx] = i
            st.append(i)

        # clear stack to reuse
        st.clear()

        # prev_ge: nearest index to left with height >= arr[i]
        for i in range(n):
            while st and arr[st[-1]] < arr[i]:
                st.pop()
            if st:
                prev_ge[i] = st[-1]
            st.append(i)

        ans = 0
        for i in range(n):
            left_count = i - prev_ge[i] - 1
            right_count = next_ge[i] - i - 1
            total = left_count + right_count + 1  # include self
            if total > ans:
                ans = total
        return ans
