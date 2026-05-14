class Solution:
    
    # Function to build LPS array
    def buildLPS(self, b):
        
        m = len(b)

        # Create LPS array
        lps = [0] * m

        # Length of previous longest prefix suffix
        length = 0

        i = 1

        while i < m:
            
            # Matching elements
            if b[i] == b[length]:
                
                length += 1

                lps[i] = length

                i += 1
            else:
                
                # Try smaller prefix
                if length != 0:
                    length = lps[length - 1]
                else:
                    
                    lps[i] = 0

                    i += 1

        return lps

    def search(self, a, b):
        
        n = len(a)
        m = len(b)

        # Build LPS array
        lps = self.buildLPS(b)

        # Store answer
        ans = []

        i = 0
        j = 0

        while i < n:
            
            # Elements match
            if a[i] == b[j]:
                i += 1
                j += 1

            # Full pattern matched
            if j == m:
                
                ans.append(i - m)

                # Continue searching
                j = lps[j - 1]

            # Mismatch
            elif i < n and a[i] != b[j]:
                
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1

        return ans