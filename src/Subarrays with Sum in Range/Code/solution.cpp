class Solution {
  public:
    
    // Returns the number of subarrays whose sum is <= limit
    long long countAtMost(vector<int>& arr, int limit) {
        
        // If limit is negative, no positive subarray can satisfy it
        if (limit < 0)
            return 0;
        
        int left = 0;
        long long sum = 0;
        long long ans = 0;
        
        // Expand the window one element at a time
        for (int right = 0; right < arr.size(); right++) {
            
            // Include current element
            sum += arr[right];
            
            // Shrink window until sum becomes valid
            while (sum > limit) {
                sum -= arr[left];
                left++;
            }
            
            // Every subarray ending at right is valid
            ans += (right - left + 1);
        }
        
        return ans;
    }
    
    int countSubarray(vector<int>& arr, int l, int r) {
        
        // Required answer
        return countAtMost(arr, r) - countAtMost(arr, l - 1);
    }
};