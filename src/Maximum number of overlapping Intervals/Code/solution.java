class Solution {
    public static int overlapInt(int[][] arr) {

        // Step 1: Find maximum end
        int maxEnd = 0;
        for (int[] interval : arr) {
            maxEnd = Math.max(maxEnd, interval[1]);
        }

        // Step 2: Difference array
        int[] diff = new int[maxEnd + 2];

        // Step 3: Mark intervals
        for (int[] interval : arr) {
            int start = interval[0];
            int end = interval[1];

            diff[start] += 1;
            diff[end + 1] -= 1;
        }

        int current = 0;
        int maxOverlap = 0;

        // Step 4: Prefix sum
        for (int i = 0; i <= maxEnd; i++) {
            current += diff[i];
            maxOverlap = Math.max(maxOverlap, current);
        }

        return maxOverlap;
    }
}
