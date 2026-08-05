class Solution {
    
    // Returns number of subarrays having sum <= limit
    private long countAtMost(int[] arr, int limit) {
        
        // No valid subarray if limit is negative
        if (limit < 0)
            return 0;
        
        int left = 0;
        long sum = 0;
        long ans = 0;
        
        // Move right pointer through the array
        for (int right = 0; right < arr.length; right++) {
            
            // Add current element into window
            sum += arr[right];
            
            // Remove elements until window becomes valid
            while (sum > limit) {
                sum -= arr[left];
                left++;
            }
            
            // Count all valid subarrays ending at right
            ans += (right - left + 1);
        }
        
        return ans;
    }
    
    public int countSubarray(int[] arr, int l, int r) {
        
        // Difference gives subarrays inside [l, r]
        return (int)(countAtMost(arr, r) - countAtMost(arr, l - 1));
    }
}