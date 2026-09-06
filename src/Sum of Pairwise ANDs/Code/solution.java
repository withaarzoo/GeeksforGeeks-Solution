class Solution {
    public long pairAndSum(int[] arr) {
        // I use long because the total answer can be larger than an int.
        long ans = 0;

        // I process every possible bit independently.
        // 31 bits are enough for values up to 10^8.
        for (int bit = 0; bit < 31; bit++) {
            // I count how many array elements have this bit set.
            long count = 0;

            // I check the current bit in every array element.
            for (int x : arr) {
                // If this bit is set, this number can participate
                // in a pair contributing this bit to the AND.
                if ((x & (1L << bit)) != 0) {
                    count++;
                }
            }

            // I can choose any two of these numbers to form a pair.
            long pairs = count * (count - 1) / 2;

            // Every such pair contributes 2^bit for the current bit.
            ans += pairs * (1L << bit);
        }

        // I return the complete sum.
        return ans;
    }
}