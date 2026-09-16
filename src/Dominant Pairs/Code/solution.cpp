class Solution {
  public:
    int dominantPairs(vector<int> &arr) {
        int n = arr.size();
        int mid = n / 2;                     // split point
        
        // sort left half [0 .. mid)
        sort(arr.begin(), arr.begin() + mid);
        // sort right half [mid .. n)
        sort(arr.begin() + mid, arr.end());
        
        int ans = 0;
        int j = mid;                         // pointer into the right half
        
        // walk through every element of the left half
        for (int i = 0; i < mid; ++i) {
            // advance j while 5 * arr[j] is still <= arr[i]
            while (j < n && arr[i] >= 5LL * arr[j]) {
                ++j;
            }
            // all indices from mid to j-1 form a valid pair with this i
            ans += (j - mid);
        }
        return ans;
    }
};