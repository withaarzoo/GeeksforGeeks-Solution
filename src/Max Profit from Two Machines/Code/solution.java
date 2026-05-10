class Solution {
    public int maxProfit(int x, int y, int[] a, int[] b) {
        int n = a.length; // Total number of tasks.
        long base = 0L; // Profit if every task is sent to B first.
        int[] diff = new int[n]; // Stores gain of moving each task from B to A.

        for (int i = 0; i < n; i++) {
            base += b[i]; // Add B's profit to the base total.
            diff[i] = a[i] - b[i]; // Store the profit change if this task moves to A.
        }

        Arrays.sort(diff); // Sort in ascending order first.

        int low = Math.max(0, n - y); // Minimum tasks that must go to A.
        int high = Math.min(x, n); // Maximum tasks that can go to A.

        long running = 0L; // Running sum of the best gains.
        long bestGain = (low == 0) ? 0L : Long.MIN_VALUE; // Best valid gain so far.

        for (int i = n - 1; i >= 0; i--) {
            running += diff[i]; // Add the next largest gain.
            int taken = n - i; // Number of tasks chosen for A so far.

            if (taken >= low && taken <= high) {
                bestGain = Math.max(bestGain, running); // Update answer inside valid range.
            }

            if (taken > high)
                break; // Larger counts are not allowed, so I stop.
        }

        return (int) (base + bestGain); // Final profit after choosing the best valid set.
    }
}