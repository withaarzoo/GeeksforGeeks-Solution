/**
 * @param {number} n
 * @returns {number}
 */
class Solution {
  isSquare(x) {
    const r = Math.floor(Math.sqrt(x));
    return r * r === x;
  }

  minSquares(n) {
    // 1) Perfect square
    if (this.isSquare(n)) return 1;

    // 2) Sum of two squares
    const limit = Math.floor(Math.sqrt(n));
    for (let a = 1; a <= limit; a++) {
      if (this.isSquare(n - a * a)) return 2;
    }

    // 3) Remove powers of 4, check 7 mod 8
    let m = n;
    while (m % 4 === 0) m = Math.floor(m / 4);
    if (m % 8 === 7) return 4;

    // 4) Otherwise 3
    return 3;
  }
}
