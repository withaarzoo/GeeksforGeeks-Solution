class Solution
{
public:
    int minProd(vector<int> &arr)
    {
        int negativeCount = 0;             // Stores how many negative elements I have.
        int smallestPositive = INT_MAX;    // Stores the smallest positive element.
        int smallestAbsNegative = INT_MAX; // Stores the smallest absolute negative value.
        long long product = 1;             // Stores the product of all non-zero elements.
        bool hasZero = false;              // Tells me whether the array contains zero.

        for (int x : arr)
        {
            if (x == 0)
            {
                hasZero = true; // Zero can be the answer when no negative exists.
                continue;       // Zero is not included in a negative product.
            }

            product *= x; // I initially multiply every non-zero element.

            if (x < 0)
            {
                negativeCount++; // Count this negative element.
                smallestAbsNegative = min(
                    smallestAbsNegative, -x); // Find the negative with the smallest absolute value.
            }
            else
            {
                smallestPositive = min(
                    smallestPositive, x); // Track the smallest positive value.
            }
        }

        if (negativeCount == 0)
        {
            if (hasZero)
            {
                return 0; // With no negative, zero is smaller than all positives.
            }

            return smallestPositive; // Only positive values exist, so the smallest one is best.
        }

        if (negativeCount % 2 == 0)
        {
            product /= -smallestAbsNegative;
            // An even number of negatives gives a positive product.
            // I remove the negative with the smallest absolute value to leave an odd count.
        }

        return (int)product; // The resulting product is the minimum possible product.
    }
};