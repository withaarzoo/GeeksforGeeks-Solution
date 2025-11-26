class Solution {
    public int andInRange(int l, int r) {
        int shift = 0;

        // Remove differing bits from the right until l and r become equal
        while (l < r) {
            l >>= 1; // shift right l by 1
            r >>= 1; // shift right r by 1
            shift++; // track how many shifts we did
        }

        // l (or r) now has the common most significant bits.
        // Shift them back, filling dropped positions with zeros.
        return l << shift;
    }
}
