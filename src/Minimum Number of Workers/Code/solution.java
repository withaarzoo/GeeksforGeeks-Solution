import java.util.*;

class Solution {
    public int minMen(int[] arr) {
        int n = arr.length;
        List<int[]> intervals = new ArrayList<>();

        // Convert workers to intervals
        for (int i = 0; i < n; i++) {
            if (arr[i] == -1)
                continue;

            int left = Math.max(0, i - arr[i]);
            int right = Math.min(n - 1, i + arr[i]);
            intervals.add(new int[] { left, right });
        }

        // Sort intervals
        intervals.sort((a, b) -> a[0] - b[0]);

        int count = 0;
        int idx = 0;
        int coveredTill = 0;

        // Greedy coverage
        while (coveredTill < n) {
            int farthest = coveredTill;

            while (idx < intervals.size() && intervals.get(idx)[0] <= coveredTill) {
                farthest = Math.max(farthest, intervals.get(idx)[1] + 1);
                idx++;
            }

            if (farthest == coveredTill)
                return -1;

            count++;
            coveredTill = farthest;
        }

        return count;
    }
}
