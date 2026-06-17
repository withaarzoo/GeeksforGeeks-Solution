class Solution {
    public int maxProduct(int n) {

        // For n = 2, only cut possible is 1 + 1
        if (n == 2)
            return 1;

        // For n = 3, one cut is mandatory
        if (n == 3)
            return 2;

        // Store maximum product
        int ans = 1;

        // Keep extracting pieces of length 3
        while (n > 4) {
            ans *= 3; // Multiply product by 3
            n -= 3; // Reduce rope length
        }

        // Multiply the remaining length
        return ans * n;
    }
}