class Solution
{
public:
    string chooseSwap(string &s)
    {
        int n = s.size();

        // Stores the first occurrence index of every character
        vector<int> first(26, -1);

        // Record first occurrence of each character
        for (int i = 0; i < n; i++)
        {
            if (first[s[i] - 'a'] == -1)
            {
                first[s[i] - 'a'] = i;
            }
        }

        // Try every position from left to right
        for (int i = 0; i < n; i++)
        {

            // Check all smaller characters than s[i]
            for (int ch = 0; ch < (s[i] - 'a'); ch++)
            {

                // If a smaller character exists later in the string
                if (first[ch] > i)
                {

                    char c1 = s[i];           // current character
                    char c2 = char(ch + 'a'); // smaller character

                    // Swap all occurrences of c1 and c2
                    for (int j = 0; j < n; j++)
                    {
                        if (s[j] == c1)
                            s[j] = c2;
                        else if (s[j] == c2)
                            s[j] = c1;
                    }

                    return s;
                }
            }
        }

        return s;
    }
};