class Solution {
    public boolean wifiRange(String s, int x) {
        // I store the length of the string so I can check the ends later.
        int n = s.length();

        // I keep the first, previous, and last router positions.
        int first = -1, prev = -1, last = -1;

        // I scan every character once.
        for (int i = 0; i < n; i++) {
            // A '1' means a router is present in this room.
            if (s.charAt(i) == '1') {
                // I record the first router so I can verify left coverage.
                if (first == -1)
                    first = i;

                // I compare this router with the previous one.
                // If the gap is too large, some middle rooms are not covered.
                if (prev != -1 && i - prev > 2 * x + 1) {
                    return false;
                }

                // I move prev forward for the next router.
                prev = i;

                // I store the last router so I can verify right coverage.
                last = i;
            }
        }

        // No router means no coverage.
        if (first == -1)
            return false;

        // The first router must reach the left edge.
        if (first > x)
            return false;

        // The last router must reach the right edge.
        if (n - 1 - last > x)
            return false;

        // All checks passed, so every room is covered.
        return true;
    }
}