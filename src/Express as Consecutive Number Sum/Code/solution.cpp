class Solution {
  public:
    bool isSumOfConsecutive(int n) {
        // If n is a power of 2, it cannot be represented
        // as a sum of two or more consecutive positive numbers
        if ((n & (n - 1)) == 0)
            return false;

        // Otherwise such a representation always exists
        return true;
    }
};