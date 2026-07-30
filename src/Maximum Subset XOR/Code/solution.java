class Solution {
    public int maxSubsetXOR(int[] arr) {

        int n = arr.length;

        // Position where the next basis element will be stored
        int index = 0;

        // Process every bit from highest to lowest
        for (int bit = 31; bit >= 0; bit--) {

            int maxIndex = -1;

            // Find an element with the current bit set
            for (int i = index; i < n; i++) {
                if ((arr[i] & (1 << bit)) != 0) {
                    maxIndex = i;
                    break;
                }
            }

            // No candidate found for this bit
            if (maxIndex == -1)
                continue;

            // Swap it into the current basis position
            int temp = arr[index];
            arr[index] = arr[maxIndex];
            arr[maxIndex] = temp;

            // Remove this bit from all other numbers
            for (int i = 0; i < n; i++) {
                if (i != index && (arr[i] & (1 << bit)) != 0) {
                    arr[i] ^= arr[index];
                }
            }

            index++;
        }

        // Construct the maximum XOR
        int ans = 0;

        for (int i = 0; i < index; i++) {
            ans = Math.max(ans, ans ^ arr[i]);
        }

        return ans;
    }
}