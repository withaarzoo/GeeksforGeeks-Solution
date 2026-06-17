class Solution
{
public:
    int maxProduct(int n)
    {
        // For n = 2, only cut possible is 1 + 1
        if (n == 2)
            return 1;

        // For n = 3, at least one cut is mandatory
        if (n == 3)
            return 2;

        // Store the final maximum product
        int ans = 1;

        // Keep taking pieces of length 3
        // Stop when remaining length becomes <= 4
        while (n > 4)
        {
            ans *= 3; // Include one piece of length 3
            n -= 3;   // Remove that piece from rope
        }

        // Multiply remaining length (2, 3, or 4)
        return ans * n;
    }
};