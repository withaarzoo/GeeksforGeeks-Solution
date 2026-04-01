class Solution
{
public:
    int countStrings(int n)
    {
        // Strings of length 1:
        // "0" -> ends with 0
        // "1" -> ends with 1
        long long endWith0 = 1;
        long long endWith1 = 1;

        // Build answer for lengths from 2 to n
        for (int i = 2; i <= n; i++)
        {
            long long newEndWith0 = endWith0 + endWith1;
            long long newEndWith1 = endWith0;

            endWith0 = newEndWith0;
            endWith1 = newEndWith1;
        }

        return endWith0 + endWith1;
    }
};