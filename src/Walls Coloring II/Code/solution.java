class Solution {
    int minCost(int[][] costs) {
        int n = costs.length;
        if (n == 0)
            return 0;
        int k = costs[0].length;

        // If only one color and more than 1 wall -> impossible
        if (k == 1) {
            if (n == 1)
                return costs[0][0];
            return -1;
        }

        // prev[j] = min cost to paint up to previous wall
        // with color j on the previous wall
        long[] prev = new long[k];
        long[] curr = new long[k];

        // Base case: first wall
        for (int j = 0; j < k; j++) {
            prev[j] = costs[0][j];
        }

        // Process each wall from the second one
        for (int i = 1; i < n; i++) {
            long min1 = Long.MAX_VALUE, min2 = Long.MAX_VALUE;
            int idx1 = -1, idx2 = -1;

            // Find smallest and second smallest in prev
            for (int j = 0; j < k; j++) {
                long val = prev[j];
                if (val < min1) {
                    // shift current min1 to min2
                    min2 = min1;
                    idx2 = idx1;
                    // update min1
                    min1 = val;
                    idx1 = j;
                } else if (val < min2) {
                    min2 = val;
                    idx2 = j;
                }
            }

            // Calculate current costs
            for (int j = 0; j < k; j++) {
                long bestPrev = (j == idx1) ? min2 : min1;
                curr[j] = costs[i][j] + bestPrev;
            }

            // Move curr to prev for next iteration
            long[] temp = prev;
            prev = curr;
            curr = temp;
        }

        // Final answer is minimum in prev
        long ans = Long.MAX_VALUE;
        for (int j = 0; j < k; j++) {
            ans = Math.min(ans, prev[j]);
        }

        return (int) ans;
    }
}
