// User function Template for javascript

/**
 * @param {number} N
 * @return {number}
 */

class Solution {
    isPallindrome(N) {
        let left = 63;
        
        // Find MSB
        while (left >= 0 && ((N >> left) & 1) === 0) {
            left--;
        }
        
        let right = 0;
        
        // Compare bits
        while (left > right) {
            let leftBit = (N >> left) & 1;
            let rightBit = (N >> right) & 1;
            
            if (leftBit !== rightBit) return 0;
            
            left--;
            right++;
        }
        
        return 1;
    }
}