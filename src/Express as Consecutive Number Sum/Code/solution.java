class Solution {
    public boolean isSumOfConsecutive(int n) {
        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0) {
            return false;
        }

        // Non powers of 2 can always be expressed
        // as a sum of consecutive positive integers
        return true;
    }
}