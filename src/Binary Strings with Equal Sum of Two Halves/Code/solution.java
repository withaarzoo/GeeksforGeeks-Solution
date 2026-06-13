class Solution {
    
    // Fast modular exponentiation
    private long power(long base, long exp, long mod) {
        long result = 1;
        
        while (exp > 0) {
            // Multiply when current bit is set
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            
            // Square base for next bit
            base = (base * base) % mod;
            exp >>= 1;
        }
        
        return result;
    }
    
    public int computeValue(int n) {
        final long MOD = 1000000007L;
        
        long fact2n = 1;
        long factn = 1;
        
        // Compute factorials
        for (int i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * i) % MOD;
            
            // Save n!
            if (i == n) {
                factn = fact2n;
            }
        }
        
        // Modular inverse of n!
        long invFactn = power(factn, MOD - 2, MOD);
        
        // C(2n,n)
        long ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return (int) ans;
    }
}