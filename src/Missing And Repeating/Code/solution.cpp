class Solution
{
public:
    vector<int> findTwoElement(vector<int> &arr)
    {
        long long n = arr.size();

        // Sum of array elements and sum of squares of elements
        long long S = 0;  // actual sum
        long long Sq = 0; // actual sum of squares
        for (int x : arr)
        {
            S += x;
            Sq += 1LL * x * x; // 1LL to force 64-bit multiplication
        }

        // Expected sum and sum of squares for numbers from 1 to n
        long long S_exp = n * (n + 1) / 2;
        long long Sq_exp = n * (n + 1) * (2 * n + 1) / 6;

        // diff = R - M
        long long diff = S - S_exp;

        // diffSq = R^2 - M^2 = (R - M)(R + M)
        long long diffSq = Sq - Sq_exp;

        // sumRM = R + M
        long long sumRM = diffSq / diff;

        // Solve R and M:
        // R = ( (R - M) + (R + M) ) / 2
        long long R = (diff + sumRM) / 2;
        long long M = R - diff;

        return {(int)R, (int)M}; // [repeating, missing]
    }
};
