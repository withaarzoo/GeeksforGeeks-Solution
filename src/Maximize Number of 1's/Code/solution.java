class Solution {
    public int maxOnes(int arr[], int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;

        for (int right = 0; right < arr.length; right++) {
            // Count zeros in the window
            if (arr[right] == 0) {
                zeroCount++;
            }

            // Shrink window if zero count exceeds k
            while (zeroCount > k) {
                if (arr[left] == 0) {
                    zeroCount--;
                }
                left++;
            }

            // Update maximum length
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
