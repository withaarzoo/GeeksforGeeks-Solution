class Solution:
    def constructList(self, queries):
        
        # XOR of all future type-1 queries
        xr = 0
        
        # Stores final values
        ans = []
        
        # Traverse queries from right to left
        for typ, x in reversed(queries):
            
            # XOR operation
            if typ == 1:
                xr ^= x
            else:
                # Final value of inserted element
                ans.append(x ^ xr)
        
        # Initial element 0 after all XOR operations
        ans.append(xr)
        
        # Return sorted array
        ans.sort()
        
        return ans