class Solution {
    public int maxTask(int[] h, int[] l) {
        // n represents the total number of available days.
        int n = h.length;

        // For day 0, I can choose either high-effort or low-effort.
        // I take whichever gives more tasks.
        int prev1 = Math.max(h[0], l[0]);

        // This represents the answer before day 0.
        // It acts as dp[-1] = 0 for the first high-effort choice.
        int prev2 = 0;

        // I process every remaining day one by one.
        for (int i = 1; i < n; i++) {
            // Choosing low effort today allows me to use yesterday's best result.
            int lowChoice = prev1 + l[i];

            // Choosing high effort today means yesterday must be skipped.
            int highChoice = prev2 + h[i];

            // The better choice becomes the best result up to today.
            int current = Math.max(lowChoice, highChoice);

            // Shift the two previous DP states forward.
            prev2 = prev1;
            prev1 = current;
        }

        // prev1 contains the maximum total number of tasks.
        return prev1;
    }
}