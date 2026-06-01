class Solution {
  findMaxProduct(arr) {
    const MOD = 1000000007n;
    const n = arr.length;

    // I return the only element directly so [-1] stays -1.
    if (n === 1) {
      return arr[0];
    }

    let zeroCount = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    // I keep the smallest absolute negative value for later removal.
    let minNegAbs = 11;

    let product = 1n;

    for (const x of arr) {
      if (x === 0) {
        zeroCount++;
        continue; // Zero does not help the product in normal cases.
      }

      if (x > 0) {
        positiveCount++;
      } else {
        negativeCount++;
        minNegAbs = Math.min(minNegAbs, Math.abs(x));
      }

      // I multiply absolute values so the running product stays positive.
      product = (product * BigInt(Math.abs(x))) % MOD;
    }

    // If every value is zero, the answer must be zero.
    if (zeroCount === n) {
      return 0;
    }

    // If there is exactly one negative and no positive number,
    // zero is better than a negative product.
    if (negativeCount === 1 && positiveCount === 0) {
      return 0;
    }

    // Fast modular exponentiation for inverse.
    const modPow = (base, exp) => {
      let result = 1n;
      base %= MOD;

      while (exp > 0n) {
        if (exp & 1n) {
          result = (result * base) % MOD;
        }
        base = (base * base) % MOD;
        exp >>= 1n;
      }
      return result;
    };

    // If the number of negatives is odd, I remove the one closest to zero.
    if (negativeCount % 2 === 1) {
      const inv = modPow(BigInt(minNegAbs), MOD - 2n);
      product = (product * inv) % MOD;
    }

    return Number(product);
  }
}
