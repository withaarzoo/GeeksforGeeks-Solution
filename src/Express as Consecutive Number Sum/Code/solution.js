class Solution {
  isSumOfConsecutive(n) {
    // If n is a power of 2, answer is false
    if ((n & (n - 1)) === 0) {
      return false;
    }

    // Otherwise answer is true
    return true;
  }
}
