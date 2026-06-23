class Solution {
    int maxPeopleDefeated(int p) {

        // Binary search boundaries
        long low = 0;
        long high = 10000;

        // Stores best valid answer
        long ans = 0;

        while (low <= high) {

            // Current middle value
            long mid = low + (high - low) / 2;

            // Sum of first mid squares
            long sum = mid * (mid + 1) * (2 * mid + 1) / 6;

            // If strength is sufficient
            if (sum <= p) {
                ans = mid; // Save answer
                low = mid + 1; // Search right side
            } else {
                high = mid - 1; // Search left side
            }
        }

        return (int) ans;
    }
}