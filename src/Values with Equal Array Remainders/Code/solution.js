/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  // I use Euclid's algorithm to calculate the GCD of two numbers.
  gcd(a, b) {
    // I repeatedly replace the pair with (b, a % b).
    while (b !== 0) {
      // I save the remainder before updating the values.
      const temp = a % b;

      // I move b into a.
      a = b;

      // I move the remainder into b.
      b = temp;
    }

    // When b becomes 0, a is the GCD.
    return a;
  }

  sameMod(arr) {
    // I start with 0 because gcd(0, x) is x.
    let g = 0;

    // I compare every element with the first element.
    for (let i = 1; i < arr.length; i++) {
      // I calculate the absolute difference because only divisibility matters.
      const diff = Math.abs(arr[i] - arr[0]);

      // I update the GCD using the current difference.
      g = this.gcd(g, diff);
    }

    // If g is 0, all elements are equal.
    // Therefore, every positive k is valid and the answer is infinite.
    if (g === 0) {
      return -1;
    }

    // I will count all positive divisors of g.
    let ans = 0;

    // I only check up to sqrt(g) because divisors occur in pairs.
    for (let i = 1; i * i <= g; i++) {
      // If i divides g, then i and g/i are both divisors.
      if (g % i === 0) {
        // I count i.
        ans++;

        // I count the paired divisor only if it is different.
        if (i !== g / i) {
          ans++;
        }
      }
    }

    // I return the total number of valid k values.
    return ans;
  }
}
