class Solution {
    public long sumXOR(int[] arr) {
        int n = arr.length; // total elements
        long result = 0; // final answer

        // Check each bit position
        for (int bit = 0; bit < 32; bit++) {
            long count1 = 0; // numbers with this bit set

            // Count set bits at current position
            for (int i = 0; i < n; i++) {
                if ((arr[i] & (1 << bit)) != 0) {
                    count1++;
                }
            }

            long count0 = n - count1; // numbers with bit = 0

            // Add contribution of this bit
            result += count1 * count0 * (1L << bit);
        }

        return result;
    }
}