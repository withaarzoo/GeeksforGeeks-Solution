class Solution
{
public:
    string largestSwap(string &s)
    {
        int n = s.length();

        // Store last occurrence of each digit (0-9)
        vector<int> last(10, -1);

        for (int i = 0; i < n; i++)
        {
            last[s[i] - '0'] = i;
        }

        // Traverse the string
        for (int i = 0; i < n; i++)
        {

            // Check if a larger digit exists later
            for (int d = 9; d > s[i] - '0'; d--)
            {

                if (last[d] > i)
                {
                    // Swap current digit with the larger digit
                    swap(s[i], s[last[d]]);
                    return s;
                }
            }
        }

        // If no swap improves the number
        return s;
    }
};