class Solution {
    public int maxIndexDifference(String s) {

        // Store the farthest reachable ending index for every character.
        int[] best = new int[26];

        // Initialize with -1 (means not seen yet).
        java.util.Arrays.fill(best, -1);

        int ans = -1;

        // Traverse from right to left.
        for (int i = s.length() - 1; i >= 0; i--) {

            // Character index (0 -> 'a').
            int c = s.charAt(i) - 'a';

            int reach;

            // 'z' cannot jump further.
            if (c == 25) {
                reach = i;
            }
            // Use the already computed answer for the next character.
            else if (best[c + 1] != -1) {
                reach = best[c + 1];
            }
            // No next character exists on the right.
            else {
                reach = i;
            }

            // Store the best ending index for this character.
            best[c] = Math.max(best[c], reach);

            // Update answer for every 'a'.
            if (c == 0) {
                ans = Math.max(ans, reach - i);
            }
        }

        return ans;
    }
}