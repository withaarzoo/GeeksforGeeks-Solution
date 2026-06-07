class Solution {
    public String profession(int level, int pos) {

        // Convert position to zero-based indexing
        int x = pos - 1;

        // Count set bits
        int cnt = 0;
        while (x > 0) {
            cnt += (x & 1); // Check if current bit is set
            x >>= 1;        // Move to next bit
        }

        // Even flips => Engineer, Odd flips => Doctor
        return (cnt % 2 == 0) ? "Engineer" : "Doctor";
    }
}