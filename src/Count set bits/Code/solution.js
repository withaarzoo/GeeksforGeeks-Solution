/**
 * @param {Number} N
 * @returns {Number}
 */

class Solution {
  countSetBits(N) {
    let total = 0;

    // iterate over bit positions while (1 << i) <= N
    for (let i = 0; 1 << i <= N; i++) {
      let bitMask = 1 << i; // 2^i
      let cycleLen = bitMask << 1; // 2^(i+1)

      let fullCycles = Math.floor(N / cycleLen);

      // each full cycle contributes bitMask ones at this bit
      total += fullCycles * bitMask;

      let remainder = N % cycleLen;

      let extraOnes = remainder - bitMask + 1;
      if (extraOnes > 0) {
        total += extraOnes;
      }
    }

    return total;
  }
}
