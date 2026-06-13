class Solution {
  public:
    
    // Fast modular exponentiation
    long long power(long long base, long long exp, long long mod) {
        long long result = 1;
        
        while (exp > 0) {
            // If current bit is set, multiply answer
            if (exp & 1)
                result = (result * base) % mod;
            
            // Square the base for next bit
            base = (base * base) % mod;
            exp >>= 1;
        }
        
        return result;
    }
    
    int computeValue(int n) {
        const long long MOD = 1000000007;
        
        long long fact2n = 1; // Stores (2n)!
        long long factn = 1;  // Stores n!
        
        // Compute factorials
        for (int i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * i) % MOD;
            
            // Capture n! when i reaches n
            if (i == n)
                factn = fact2n;
        }
        
        // Modular inverse of n!
        long long invFactn = power(factn, MOD - 2, MOD);
        
        // C(2n,n) = (2n)! / (n! * n!)
        long long ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return (int)ans;
    }
};