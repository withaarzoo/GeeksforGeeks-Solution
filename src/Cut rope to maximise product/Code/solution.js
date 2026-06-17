class Solution {
  maxProduct(n) {
    // For n = 2, only cut is 1 + 1
    if (n === 2) return 1;

    // For n = 3, at least one cut is required
    if (n === 3) return 2;

    // Store maximum product
    let ans = 1;

    // Repeatedly take pieces of length 3
    while (n > 4) {
      ans *= 3; // Add one factor 3
      n -= 3; // Reduce remaining rope
    }

    // Multiply leftover part
    return ans * n;
  }
}
