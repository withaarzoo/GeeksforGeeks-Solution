class Solution {
    int maxSubstring(String s) {
        
        // Stores maximum difference found so far
        int maxSum = -1;
        
        // Stores current substring sum
        int currentSum = 0;
        
        for(int i = 0; i < s.length(); i++) {
            
            // Convert character into contribution
            int value = (s.charAt(i) == '0') ? 1 : -1;
            
            // Extend current substring
            currentSum += value;
            
            // Update answer
            maxSum = Math.max(maxSum, currentSum);
            
            // Start fresh if sum becomes negative
            if(currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
}