class Solution {
  minProd(arr) {
    let negativeCount = 0; // Stores how many negative elements I have.
    let smallestPositive = Infinity; // Stores the smallest positive element.
    let smallestAbsNegative = Infinity; // Stores the smallest absolute negative value.
    let product = 1; // Stores the product of all non-zero elements.
    let hasZero = false; // Tells me whether the array contains zero.

    for (const x of arr) {
      if (x === 0) {
        hasZero = true; // Zero can be the answer when no negative exists.
        continue; // Zero is not included in a negative product.
      }

      product *= x; // I initially multiply every non-zero element.

      if (x < 0) {
        negativeCount++; // Count this negative element.
        smallestAbsNegative = Math.min(smallestAbsNegative, -x); // Find the negative with the smallest absolute value.
      } else {
        smallestPositive = Math.min(smallestPositive, x); // Track the smallest positive value.
      }
    }

    if (negativeCount === 0) {
      if (hasZero) {
        return 0; // With no negative, zero is smaller than all positives.
      }

      return smallestPositive; // Only positive values exist, so the smallest one is best.
    }

    if (negativeCount % 2 === 0) {
      product /= -smallestAbsNegative;
      // An even number of negatives gives a positive product.
      // I remove the negative with the smallest absolute value to leave an odd count.
    }

    return product; // The resulting product is the minimum possible product.
  }
}
