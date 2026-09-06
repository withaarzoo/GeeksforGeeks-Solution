/**
 *@param {number[]} arr
 *@return {string}
 **/
class Solution {
  pairAndSum(arr) {
    // I use BigInt because JavaScript's Number cannot safely
    // represent every possible large integer exactly.
    let ans = 0n;

    // I process each bit separately.
    // 27 bits are enough for 10^8, and 31 keeps the loop general.
    for (let bit = 0; bit < 31; bit++) {
      // I count how many elements have the current bit set.
      let count = 0n;

      // I check the current bit for every array element.
      for (const x of arr) {
        // I use BigInt for the bit check so all arithmetic
        // involved in the final answer stays exact.
        const value = BigInt(x);

        // If the current bit is set, this number can form
        // a pair contributing this bit to the AND.
        if ((value & (1n << BigInt(bit))) !== 0n) {
          count++;
        }
      }

      // I choose any two numbers from the count numbers.
      const pairs = (count * (count - 1n)) / 2n;

      // Each pair contributes 2^bit for this bit.
      ans += pairs * (1n << BigInt(bit));
    }

    // The expected JavaScript solution format returns the large
    // integer as a string so no precision is lost.
    return ans.toString();
  }
}
