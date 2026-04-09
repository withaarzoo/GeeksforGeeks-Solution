class Solution:
    def intersection(self, a, b):
        ans = []
        
        i, j = 0, 0
        n, m = len(a), len(b)
        
        while i < n and j < m:
            
            # If current element in a is smaller
            if a[i] < b[j]:
                i += 1
            
            # If current element in b is smaller
            elif a[i] > b[j]:
                j += 1
            
            # If both elements are equal
            else:
                ans.append(a[i])
                
                current = a[i]
                
                # Skip duplicates in array a
                while i < n and a[i] == current:
                    i += 1
                
                # Skip duplicates in array b
                while j < m and b[j] == current:
                    j += 1
        
        return ans