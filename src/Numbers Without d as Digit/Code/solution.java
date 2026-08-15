class Solution {
    public int countWithout(int n, int d) {
        // I convert n to a string so I can process its digits from left to right.
        String s = String.valueOf(n);
        
        // dp[tight][started] stores the number of valid ways for the processed prefix.
        // tight = 1 means the prefix is equal to n's prefix.
        // started = 1 means I have already placed a real digit.
        long[][] dp = new long[2][2];
        
        // Initially, no digit has been placed, so the number has not started.
        // The empty prefix is still equal to n's prefix.
        dp[1][0] = 1;
        
        // I process each digit of n.
        for (int pos = 0; pos < s.length(); pos++) {
            // I create the DP table for the next digit position.
            long[][] next = new long[2][2];
            
            // I check every possible DP state.
            for (int tight = 0; tight <= 1; tight++) {
                for (int started = 0; started <= 1; started++) {
                    // There is nothing to process if this state has no ways.
                    if (dp[tight][started] == 0) {
                        continue;
                    }
                    
                    // A tight state cannot choose a digit larger than n's digit.
                    // A non-tight state can choose any digit from 0 to 9.
                    int limit = tight == 1 ? s.charAt(pos) - '0' : 9;
                    
                    // I try every digit allowed at this position.
                    for (int digit = 0; digit <= limit; digit++) {
                        // Leading zero means the number has still not started.
                        boolean nextStarted = started == 1 || digit != 0;
                        
                        // Once the number has started, digit d is forbidden.
                        // This also correctly handles d = 0.
                        if (nextStarted && digit == d) {
                            continue;
                        }
                        
                        // The next state remains tight only if I choose
                        // exactly the current digit of n.
                        int nextTight = (tight == 1 && digit == limit) ? 1 : 0;
                        
                        // I add all ways reaching this next state.
                        next[nextTight][nextStarted ? 1 : 0] += dp[tight][started];
                    }
                }
            }
            
            // I replace the old states with the states for the next position.
            dp = next;
        }
        
        // I sum only states where the number has started.
        // The not-started state represents 0, which is not part of the answer.
        return (int) (dp[0][1] + dp[1][1]);
    }
}