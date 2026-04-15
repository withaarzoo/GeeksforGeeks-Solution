class Solution
{
public:
    string URLify(string &s)
    {
        // String to store final answer
        string result = "";

        // Traverse every character
        for (char ch : s)
        {

            // If space is found, replace with %20
            if (ch == ' ')
            {
                result += "%20";
            }
            else
            {
                result += ch;
            }
        }

        // Return final modified string
        return result;
    }
};