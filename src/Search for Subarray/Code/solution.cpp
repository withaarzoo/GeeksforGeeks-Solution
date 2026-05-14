class Solution {
  public:
    
    // Function to build LPS array
    vector<int> buildLPS(vector<int>& b) {
        
        int m = b.size();
        
        // LPS array
        vector<int> lps(m, 0);

        // Length of previous longest prefix suffix
        int len = 0;

        // Start from index 1 because lps[0] is always 0
        int i = 1;

        while (i < m) {
            
            // If current elements match
            if (b[i] == b[len]) {
                
                // Increase prefix length
                len++;
                
                // Store it in lps
                lps[i] = len;
                
                i++;
            }
            else {
                
                // Try smaller prefix
                if (len != 0) {
                    len = lps[len - 1];
                }
                else {
                    
                    // No prefix possible
                    lps[i] = 0;
                    
                    i++;
                }
            }
        }

        return lps;
    }

    vector<int> search(vector<int> &a, vector<int> &b) {
        
        int n = a.size();
        int m = b.size();

        // Build LPS array for pattern
        vector<int> lps = buildLPS(b);

        // Store answer
        vector<int> ans;

        // Pointer for a[]
        int i = 0;

        // Pointer for b[]
        int j = 0;

        while (i < n) {
            
            // If elements match
            if (a[i] == b[j]) {
                i++;
                j++;
            }

            // Full pattern matched
            if (j == m) {
                
                // Store starting index
                ans.push_back(i - m);

                // Continue searching
                j = lps[j - 1];
            }
            
            // Mismatch happens
            else if (i < n && a[i] != b[j]) {
                
                // Move j using lps
                if (j != 0) {
                    j = lps[j - 1];
                }
                else {
                    
                    // Move i if no prefix available
                    i++;
                }
            }
        }

        return ans;
    }
};