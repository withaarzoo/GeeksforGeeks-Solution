class Solution
{
public:
    int isPallindrome(long long int N)
    {
        // Find the position of the most significant bit (MSB)
        int left = 63; // assuming 64-bit number

        // Move left pointer to the first '1' bit
        while (left >= 0 && ((N >> left) & 1) == 0)
        {
            left--;
        }

        int right = 0; // least significant bit

        // Compare bits from both ends
        while (left > right)
        {
            int leftBit = (N >> left) & 1;   // extract left bit
            int rightBit = (N >> right) & 1; // extract right bit

            // If mismatch found, not a palindrome
            if (leftBit != rightBit)
                return 0;

            // Move pointers inward
            left--;
            right++;
        }

        return 1; // all bits matched
    }
};