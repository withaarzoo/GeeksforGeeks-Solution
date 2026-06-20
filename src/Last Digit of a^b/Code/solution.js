/**
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */

class Solution {
  // Fast modular exponentiation
  powerMod(base, exp) {
    let result = 1;

    while (exp > 0) {
      // Multiply when bit is set
      if (exp & 1) {
        result = (result * base) % 10;
      }

      // Square the base
      base = (base * base) % 10;

      // Move to next bit
      exp >>= 1;
    }

    return result;
  }

  getLastDigit(a, b) {
    // Any number raised to power 0 is 1
    if (b === "0") {
      return 1;
    }

    // Last digit of base
    const lastDigit = Number(a[a.length - 1]);

    // Compute b % 4
    let exponent = 0;

    for (const ch of b) {
      exponent = (exponent * 10 + Number(ch)) % 4;
    }

    // Handle complete cycle
    if (exponent === 0) {
      exponent = 4;
    }

    return this.powerMod(lastDigit, exponent);
  }
}
