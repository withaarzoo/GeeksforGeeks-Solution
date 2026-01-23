import java.util.*;

class Solution {
    public int maxPeople(int[] arr) {
        int n = arr.length;
        if (n == 0)
            return 0;

        int[] next_ge = new int[n];
        Arrays.fill(next_ge, n);
        int[] prev_ge = new int[n];
        Arrays.fill(prev_ge, -1);
        Deque<Integer> st = new ArrayDeque<>();

        // next_ge: nearest index to right with height >= arr[i]
        for (int i = 0; i < n; ++i) {
            while (!st.isEmpty() && arr[i] >= arr[st.peek()]) {
                next_ge[st.pop()] = i;
            }
            st.push(i);
        }
        st.clear();

        // prev_ge: nearest index to left with height >= arr[i]
        for (int i = 0; i < n; ++i) {
            while (!st.isEmpty() && arr[st.peek()] < arr[i])
                st.pop();
            if (!st.isEmpty())
                prev_ge[i] = st.peek();
            st.push(i);
        }

        int ans = 0;
        for (int i = 0; i < n; ++i) {
            int left_count = i - prev_ge[i] - 1;
            int right_count = next_ge[i] - i - 1;
            int total = left_count + right_count + 1;
            ans = Math.max(ans, total);
        }
        return ans;
    }
}
