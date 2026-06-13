class Solution:
    def power(self, base, exp, mod):
        # Fast modular exponentiation
        result = 1
        
        while exp > 0:
            # If current bit is set
            if exp & 1:
                result = (result * base) % mod
            
            # Square base for next bit
            base = (base * base) % mod
            exp >>= 1
        
        return result

    def computeValue(self, n):
        MOD = 1000000007

        fact2n = 1  # (2n)!
        factn = 1   # n!

        # Compute factorials
        for i in range(1, 2 * n + 1):
            fact2n = (fact2n * i) % MOD

            # Store n!
            if i == n:
                factn = fact2n

        # Modular inverse of n!
        inv_factn = self.power(factn, MOD - 2, MOD)

        # C(2n,n)
        ans = fact2n
        ans = (ans * inv_factn) % MOD
        ans = (ans * inv_factn) % MOD

        return ans