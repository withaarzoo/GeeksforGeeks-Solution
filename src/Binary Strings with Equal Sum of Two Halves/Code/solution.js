'use strict';

class Solution {
    
    // Fast modular exponentiation
    power(base, exp, mod) {
        let result = 1n;
        base = BigInt(base);
        exp = BigInt(exp);
        mod = BigInt(mod);
        
        while (exp > 0n) {
            // Multiply when bit is set
            if (exp & 1n) {
                result = (result * base) % mod;
            }
            
            // Square the base
            base = (base * base) % mod;
            exp >>= 1n;
        }
        
        return result;
    }
    
    computeValue(n) {
        const MOD = 1000000007n;
        
        let fact2n = 1n;
        let factn = 1n;
        
        // Compute factorials
        for (let i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * BigInt(i)) % MOD;
            
            // Save n!
            if (i === n) {
                factn = fact2n;
            }
        }
        
        // Modular inverse of n!
        const invFactn = this.power(factn, MOD - 2n, MOD);
        
        // C(2n,n)
        let ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return Number(ans);
    }
};