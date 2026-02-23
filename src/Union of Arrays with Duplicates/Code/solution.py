class Solution:    
    def findUnion(self, a, b):
        # Using set to remove duplicates automatically
        s = set()
        
        # Insert elements from array a
        for num in a:
            s.add(num)
        
        # Insert elements from array b
        for num in b:
            s.add(num)
        
        # Convert set to list
        return list(s)