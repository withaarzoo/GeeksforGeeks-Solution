class Solution:
    def longestSubarray(self, arr):
        n = len(arr)
        left = [0] * n
        right = [0] * n
        st = []

        for i in range(n):
            while st and arr[st[-1]] <= arr[i]:
                st.pop()
            left[i] = st[-1] if st else -1
            st.append(i)
        
        st = []
        
        for i in range(n-1, -1, -1):
            while st and arr[st[-1]] <= arr[i]:
                st.pop()
            right[i] = st[-1] if st else n
            st.append(i)
        
        ans = 0
        for i in range(n):
            length = right[i] - left[i] - 1
            if arr[i] <= length:
                ans = max(ans, length)
                
        return ans