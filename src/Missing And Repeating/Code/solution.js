/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
  findTwoElement(arr) {
    const n = arr.length;

    // Use BigInt to avoid precision issues for large n
    let S = 0n; // sum
    let Sq = 0n; // sum of squares

    for (const x of arr) {
      const bx = BigInt(x);
      S += bx;
      Sq += bx * bx;
    }

    const N = BigInt(n);
    const S_exp = (N * (N + 1n)) / 2n;
    const Sq_exp = (N * (N + 1n) * (2n * N + 1n)) / 6n;

    const diff = S - S_exp; // R - M (BigInt)
    const diffSq = Sq - Sq_exp; // R^2 - M^2

    const sumRM = diffSq / diff; // R + M

    const R = (diff + sumRM) / 2n; // repeating
    const M = R - diff; // missing

    // Convert back to normal numbers for the result
    return [Number(R), Number(M)]; // [repeating, missing]
  }
}
