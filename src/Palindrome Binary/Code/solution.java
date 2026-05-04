// User function Template for Java

class Solution {
    static long isPallindrome(long N) {
        int left = 63; // maximum bits for long
        
        // Find MSB
        while (left >= 0 && ((N >> left) & 1) == 0) {
            left--;
        }
        
        int right = 0;
        
        // Compare bits
        while (left > right) {
            long leftBit = (N >> left) & 1;
            long rightBit = (N >> right) & 1;
            
            if (leftBit != rightBit) return 0;
            
            left--;
            right++;
        }
        
        return 1;
    }
}