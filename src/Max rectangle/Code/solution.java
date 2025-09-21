import java.util.*;

class Solution {
    static int maxArea(int mat[][]) {
        if (mat == null || mat.length == 0 || mat[0].length == 0) return 0;
        int n = mat.length;
        int m = mat[0].length;
        int[] heights = new int[m];
        int maxArea = 0;

        for (int i = 0; i < n; i++) {
            // update heights for this row
            for (int j = 0; j < m; j++) {
                heights[j] = (mat[i][j] == 1) ? heights[j] + 1 : 0;
            }

            // largest rectangle in histogram
            Deque<Integer> st = new ArrayDeque<>();
            for (int j = 0; j <= m; j++) {
                int cur = (j == m) ? 0 : heights[j]; // sentinel
                while (!st.isEmpty() && heights[st.peek()] > cur) {
                    int h = heights[st.pop()];
                    int width = st.isEmpty() ? j : (j - st.peek() - 1);
                    maxArea = Math.max(maxArea, h * width);
                }
                st.push(j);
            }
        }
        return maxArea;
    }
}
