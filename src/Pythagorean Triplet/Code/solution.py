class Solution:
    def pythagoreanTriplet(self, arr):
        
        maxVal = max(arr)
        
        # Presence array
        present = [False] * (maxVal + 1)
        
        for num in arr:
            present[num] = True
        
        # Try all pairs (a, b)
        for a in range(1, maxVal + 1):
            
            if not present[a]:
                continue
            
            for b in range(a, maxVal + 1):
                
                if not present[b]:
                    continue
                
                cSquare = a*a + b*b
                
                c = int(cSquare ** 0.5)
                
                if c <= maxVal and c*c == cSquare and present[c]:
                    return True
        
        return False