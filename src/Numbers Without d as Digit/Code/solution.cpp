class Solution {
  public:
    int countWithout(int n, int d) {
        // I store n as a string so I can process its digits from left to right.
        string s = to_string(n);
        
        // dp[tight][started] stores the number of valid ways for the processed prefix.
        // tight = 1 means the prefix is exactly equal to n's prefix.
        // started = 1 means I have already placed a non-leading-zero digit.
        long long dp[2][2] = {};
        
        // Before processing anything, the number has not started
        // and the prefix is tight with n.
        dp[1][0] = 1;
        
        // I process every digit of n from left to right.
        for (char current : s) {
            // I create a fresh DP table for the next position.
            long long next[2][2] = {};
            
            // I check both possible tight and started states.
            for (int tight = 0; tight <= 1; ++tight) {
                for (int started = 0; started <= 1; ++started) {
                    // I skip states that have no valid ways.
                    if (dp[tight][started] == 0) {
                        continue;
                    }
                    
                    // If the prefix is tight, I cannot exceed the current digit of n.
                    // Otherwise, I can use any digit from 0 to 9.
                    int limit = tight ? current - '0' : 9;
                    
                    // I try every possible digit for this position.
                    for (int digit = 0; digit <= limit; ++digit) {
                        // A leading zero does not count as an actual digit.
                        bool nextStarted = started || digit != 0;
                        
                        // I only reject digit d if the number has actually started.
                        // This is important when d is 0 because leading zeros are ignored.
                        if (nextStarted && digit == d) {
                            continue;
                        }
                        
                        // The next state is tight only when the chosen digit
                        // is exactly the current digit of n.
                        int nextTight = tight && (digit == limit);
                        
                        // I add all ways from the current state to the next state.
                        next[nextTight][nextStarted] += dp[tight][started];
                    }
                }
            }
            
            // I move the next-position states into the current DP table.
            for (int tight = 0; tight <= 1; ++tight) {
                for (int started = 0; started <= 1; ++started) {
                    dp[tight][started] = next[tight][started];
                }
            }
        }
        
        // dp[0][1] and dp[1][1] contain all valid positive numbers.
        // I also count the number 0 through dp[*][0], so I exclude it
        // by simply summing only states where the number has started.
        return static_cast<int>(dp[0][1] + dp[1][1]);
    }
};