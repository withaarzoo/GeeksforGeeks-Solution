class Solution {
    public int findPosition(int n) {
        // If n is 0, no set bits
        if (n == 0) return -1;
        
        // Check if exactly one set bit exists
        if ((n & (n - 1)) != 0) return -1;
        
        int position = 1; // Start from LSB
        
        // Traverse bits
        while (n > 0) {
            // If current bit is 1, return position
            if ((n & 1) == 1) return position;
            
            // Shift right
            n = n >> 1;
            
            position++; // Increase position
        }
        
        return -1;
    }
}