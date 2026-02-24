class Solution {
  public:
    int equalSumSpan(vector<int> &a1, vector<int> &a2) {
        int n = a1.size();
        
        unordered_map<int, int> mp;  // prefixSum -> first index
        int prefixSum = 0;
        int maxLen = 0;
        
        for(int i = 0; i < n; i++) {
            // Build difference prefix sum
            prefixSum += (a1[i] - a2[i]);
            
            // If prefixSum becomes 0, span from 0 to i is valid
            if(prefixSum == 0) {
                maxLen = i + 1;
            }
            
            // If prefixSum seen before, subarray between previous index+1 to i has sum 0
            if(mp.find(prefixSum) != mp.end()) {
                maxLen = max(maxLen, i - mp[prefixSum]);
            } else {
                // Store first occurrence only
                mp[prefixSum] = i;
            }
        }
        
        return maxLen;
    }
};