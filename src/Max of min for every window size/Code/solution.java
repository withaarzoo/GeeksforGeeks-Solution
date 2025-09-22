import java.util.ArrayList;
import java.util.ArrayDeque;

class Solution {
    public ArrayList<Integer> maxOfMins(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        if (n == 0) return result;

        int[] left = new int[n];
        int[] right = new int[n];
        ArrayDeque<Integer> st = new ArrayDeque<>();

        // previous smaller element (strictly smaller)
        for (int i = 0; i < n; ++i) {
            while (!st.isEmpty() && arr[st.peekLast()] >= arr[i]) st.removeLast();
            left[i] = st.isEmpty() ? -1 : st.peekLast();
            st.addLast(i);
        }

        st.clear();

        // next smaller element (strictly smaller)
        for (int i = n - 1; i >= 0; --i) {
            while (!st.isEmpty() && arr[st.peekLast()] >= arr[i]) st.removeLast();
            right[i] = st.isEmpty() ? n : st.peekLast();
            st.addLast(i);
        }

        // answer[len] holds maximum of minima for windows of size len
        int[] answer = new int[n + 1]; // default 0, safe since arr[i] >= 1
        for (int i = 0; i < n; ++i) {
            int len = right[i] - left[i] - 1;
            if (arr[i] > answer[len]) answer[len] = arr[i];
        }

        // Fill missing entries by propagating from larger window sizes
        for (int len = n - 1; len >= 1; --len) {
            if (answer[len + 1] > answer[len]) answer[len] = answer[len + 1];
        }

        // collect results for window sizes 1..n
        for (int i = 1; i <= n; ++i) result.add(answer[i]);
        return result;
    }
}
