class Solution {

    // Function to calculate GCD
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Simulate pouring from one jug to another
    private int pour(int fromCap, int toCap, int d) {
        int from = fromCap;
        int to = 0;
        int steps = 1; // Filling source jug

        while (from != d && to != d) {

            // Transfer water
            int transfer = Math.min(from, toCap - to);
            to += transfer;
            from -= transfer;
            steps++;

            // If target found
            if (from == d || to == d) {
                break;
            }

            // Refill source jug if empty
            if (from == 0) {
                from = fromCap;
                steps++;
            }

            // Empty target jug if full
            if (to == toCap) {
                to = 0;
                steps++;
            }
        }

        return steps;
    }

    public int minSteps(int m, int n, int d) {

        // Impossible if d is larger than both jugs
        if (d > Math.max(m, n)) {
            return -1;
        }

        // Impossible if d is not divisible by gcd
        if (d % gcd(m, n) != 0) {
            return -1;
        }

        // Minimum of both possible directions
        return Math.min(pour(m, n, d), pour(n, m, d));
    }
}