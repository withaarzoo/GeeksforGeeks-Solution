class Solution {
    public int numOfWays(int n, int m) {

        // Total number of cells
        long cells = 1L * n * m;

        // Total ordered placements
        long total = cells * (cells - 1);

        // Count attacking placements
        long attacking = 0;

        // Count all valid 2 x 3 rectangles
        if (n >= 2 && m >= 3) {
            attacking += 4L * (n - 1) * (m - 2);
        }

        // Count all valid 3 x 2 rectangles
        if (n >= 3 && m >= 2) {
            attacking += 4L * (n - 2) * (m - 1);
        }

        // Remaining placements are non-attacking
        return (int) (total - attacking);
    }
}