class Solution {
    public boolean canSeatAllPeople(int k, int[] seats) {
        int n = seats.length;

        // No people need seating
        if (k == 0)
            return true;

        // Traverse all seats
        for (int i = 0; i < n; i++) {

            // Skip occupied seats
            if (seats[i] == 1)
                continue;

            // Check left side
            boolean leftEmpty = (i == 0 || seats[i - 1] == 0);

            // Check right side
            boolean rightEmpty = (i == n - 1 || seats[i + 1] == 0);

            // Safe position found
            if (leftEmpty && rightEmpty) {
                seats[i] = 1; // Occupy seat
                k--; // One person seated

                // All people seated
                if (k == 0)
                    return true;
            }
        }

        // Could not seat everyone
        return false;
    }
}