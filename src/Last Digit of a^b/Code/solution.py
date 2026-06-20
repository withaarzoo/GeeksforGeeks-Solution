class Solution:
    
    # Fast modular exponentiation
    def powerMod(self, base, exp):
        result = 1
        
        while exp > 0:
            
            # Multiply when current bit is set
            if exp & 1:
                result = (result * base) % 10
            
            # Square the base
            base = (base * base) % 10
            
            # Move to next bit
            exp >>= 1
        
        return result
    
    def getLastDigit(self, a, b):
        
        # Any number raised to power 0 is 1
        if b == "0":
            return 1
        
        # Only last digit of a matters
        lastDigit = int(a[-1])
        
        # Compute b % 4 from string
        exponent = 0
        for ch in b:
            exponent = (exponent * 10 + int(ch)) % 4
        
        # Convert remainder 0 into cycle position 4
        if exponent == 0:
            exponent = 4
        
        return self.powerMod(lastDigit, exponent)