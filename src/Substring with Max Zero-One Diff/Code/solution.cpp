class Solution
{
public:
    int maxSubstring(string &s)
    {

        // Stores maximum difference found so far
        int maxSum = -1;

        // Stores current substring sum
        int currentSum = 0;

        for (char ch : s)
        {

            // Convert:
            // '0' -> +1
            // '1' -> -1
            int value = (ch == '0') ? 1 : -1;

            // Extend current substring
            currentSum += value;

            // Update best answer
            maxSum = max(maxSum, currentSum);

            // Negative sum can never help future substrings
            if (currentSum < 0)
            {
                currentSum = 0;
            }
        }

        return maxSum;
    }
};