import java.util.*;

class Solution {
    public int minCost(int[] heights, int[] cost) {

        int n = heights.length;

        // Pair height and cost
        long[][] towers = new long[n][2];
        for (int i = 0; i < n; i++) {
            towers[i][0] = heights[i];
            towers[i][1] = cost[i];
        }

        // Sort by height
        Arrays.sort(towers, (a, b) -> Long.compare(a[0], b[0]));

        long totalWeight = 0;
        for (int i = 0; i < n; i++) {
            totalWeight += towers[i][1];
        }

        long currWeight = 0;
        long targetHeight = 0;

        // Find weighted median
        for (int i = 0; i < n; i++) {
            currWeight += towers[i][1];
            if (currWeight * 2 >= totalWeight) {
                targetHeight = towers[i][0];
                break;
            }
        }

        long result = 0;
        for (int i = 0; i < n; i++) {
            result += Math.abs(towers[i][0] - targetHeight) * towers[i][1];
        }

        return (int) result;
    }
}
