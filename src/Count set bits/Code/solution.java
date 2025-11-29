class Solution {
    public static int countSetBits(int n) {
        long total = 0; // use long for safety in calculation

        // loop over bit positions
        for (int i = 0; (1L << i) <= n; i++) {
            long bitMask = 1L << i; // 2^i
            long cycleLen = bitMask << 1; // 2^(i+1)

            long fullCycles = n / cycleLen; // complete pattern blocks

            // in each full cycle, bit i is '1' exactly bitMask times
            total += fullCycles * bitMask;

            long remainder = n % cycleLen; // leftover part

            long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) {
                total += extraOnes;
            }
        }

        return (int) total;
    }
}
