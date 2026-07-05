class Solution
{
public:
    int maxCharGap(string &s)
    {
        // firstPos[i] stores the first index where each letter appeared
        vector<int> firstPos(26, -1);

        // I keep -1 so the answer stays correct if no character repeats
        int maxGap = -1;

        // I scan the string once from left to right
        for (int i = 0; i < s.size(); i++)
        {
            // Convert the current lowercase letter into an index from 0 to 25
            int index = s[i] - 'a';

            // If this is the first occurrence, I store its position
            if (firstPos[index] == -1)
            {
                firstPos[index] = i;
            }
            else
            {
                // Subtract 1 because I only count characters between the two matches
                int gap = i - firstPos[index] - 1;

                // Keep the largest gap found so far
                maxGap = max(maxGap, gap);
            }
        }

        // Returns -1 automatically if no character appeared twice
        return maxGap;
    }
};