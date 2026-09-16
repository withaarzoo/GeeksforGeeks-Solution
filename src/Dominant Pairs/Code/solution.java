class Solution {
    public int dominantPairs(int[] arr) {
        int n = arr.length;
        int mid = n / 2;                     // split point
        
        // sort left half [0 .. mid)
        Arrays.sort(arr, 0, mid);
        // sort right half [mid .. n)
        Arrays.sort(arr, mid, n);
        
        int ans = 0;
        int j = mid;                         // pointer into the right half
        
        // walk through every element of the left half
        for (int i = 0; i < mid; ++i) {
            // advance j while 5 * arr[j] is still <= arr[i]
            // use long to avoid overflow
            while (j < n && arr[i] >= 5L * arr[j]) {
                ++j;
            }
            // all indices from mid to j-1 form a valid pair with this i
            ans += (j - mid);
        }
        return ans;
    }
}