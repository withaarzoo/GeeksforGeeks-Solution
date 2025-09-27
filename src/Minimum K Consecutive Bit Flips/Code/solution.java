class Solution {
    public int kBitFlips(int[] arr, int k) {
        int n = arr.length;
        int flips = 0; // parity of active flips: 0 or 1
        int ans = 0;

        for (int i = 0; i < n; ++i) {
            // If a flip started at i-k, its effect ends now.
            if (i >= k && arr[i - k] > 1) {
                flips ^= 1;
            }

            int bit = (arr[i] & 1) ^ flips;
            if (bit == 0) {
                if (i + k > n) return -1;
                ans++;
                flips ^= 1;      // start a new flip affecting future indices
                arr[i] += 2;     // mark flip start
            }
        }
        return ans;
    }
}
