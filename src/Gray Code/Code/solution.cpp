class Solution
{
public:
    vector<string> graycode(int n)
    {
        vector<string> result;

        // Total number of Gray Codes = 2^n
        int total = 1 << n;

        // Generate Gray Code for every number from 0 to 2^n - 1
        for (int i = 0; i < total; i++)
        {

            // Gray Code formula
            int gray = i ^ (i >> 1);

            string binary = "";

            // Convert gray number into binary string of length n
            for (int bit = n - 1; bit >= 0; bit--)
            {
                if (gray & (1 << bit))
                    binary += '1';
                else
                    binary += '0';
            }

            result.push_back(binary);
        }

        return result;
    }
};