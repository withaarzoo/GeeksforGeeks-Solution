class Solution
{
public:
    int findIndex(string &s)
    {
        // I first count all closing brackets, because this is the total
        // number of ')' that will be on the right side before any split.
        int closeCount = 0;
        for (char ch : s)
        {
            if (ch == ')')
                closeCount++;
        }

        // This keeps track of how many '(' I have seen on the left side.
        int openCount = 0;
        int n = s.size();

        // I check every split position from 0 to n.
        // Position i means: left side is [0 ... i-1], right side is [i ... n-1].
        for (int i = 0; i <= n; i++)
        {
            // If both sides have the same count, I found the first valid split.
            if (openCount == closeCount)
                return i;

            // After checking split i, I move one character forward.
            // That character leaves the right side and joins the left side.
            if (i < n)
            {
                if (s[i] == '(')
                {
                    openCount++; // This '(' now belongs to the left side.
                }
                else
                {
                    closeCount--; // This ')' is no longer on the right side.
                }
            }
        }

        // If no valid index exists, I return -1.
        return -1;
    }
};