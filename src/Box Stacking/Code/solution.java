class Solution {
    public int maxHeight(int[] height, int[] width, int[] length) {
        int n = height.length;
        int[][] boxes = new int[3 * n][3];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            int a = height[i], b = width[i], c = length[i];
            boxes[idx++] = new int[]{Math.max(b, c), Math.min(b, c), a};
            boxes[idx++] = new int[]{Math.max(a, c), Math.min(a, c), b};
            boxes[idx++] = new int[]{Math.max(a, b), Math.min(a, b), c};
        }
        Arrays.sort(boxes, (x, y) -> {
            if (x[0] != y[0]) return Integer.compare(y[0], x[0]);
            return Integer.compare(y[1], x[1]);
        });
        int m = boxes.length;
        int[] dp = new int[m];
        int ans = 0;
        for (int i = 0; i < m; i++) {
            dp[i] = boxes[i][2];
            for (int j = 0; j < i; j++) {
                if (boxes[j][0] > boxes[i][0] && boxes[j][1] > boxes[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}