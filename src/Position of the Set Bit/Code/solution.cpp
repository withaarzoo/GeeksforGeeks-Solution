class Solution {
  public:
    int findPosition(int n) {
        // If n is 0, it has no set bits
        if (n == 0) return -1;
        
        // Check if n has exactly one set bit
        // If n & (n - 1) is not 0, then more than one set bit exists
        if ((n & (n - 1)) != 0) return -1;
        
        int position = 1; // Position starts from 1 (LSB)
        
        // Keep shifting until we find the set bit
        while (n > 0) {
            // If last bit is 1, return position
            if (n & 1) return position;
            
            // Shift right to check next bit
            n = n >> 1;
            
            // Move to next position
            position++;
        }
        
        return -1; // Safety return (should not reach here)
    }
};