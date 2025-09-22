class Solution:
    def maxOfMins(self, arr):
        n = len(arr)
        if n == 0:
            return []
        left = [-1] * n
        right = [n] * n
        st = []

        # previous smaller element (strictly smaller)
        for i in range(n):
            while st and arr[st[-1]] >= arr[i]:
                st.pop()
            left[i] = st[-1] if st else -1
            st.append(i)

        st.clear()

        # next smaller element (strictly smaller)
        for i in range(n - 1, -1, -1):
            while st and arr[st[-1]] >= arr[i]:
                st.pop()
            right[i] = st[-1] if st else n
            st.append(i)

        answer = [0] * (n + 1)  # default 0 because arr[i] >= 1
        for i in range(n):
            length = right[i] - left[i] - 1
            if arr[i] > answer[length]:
                answer[length] = arr[i]

        for length in range(n - 1, 0, -1):
            if answer[length + 1] > answer[length]:
                answer[length] = answer[length + 1]

        return answer[1:]
