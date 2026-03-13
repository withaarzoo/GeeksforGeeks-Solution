class Solution
{
public:
    // Function to check if a segment is a valid IP part
    bool isValid(string &s, int start, int len)
    {

        // Length should not exceed string
        if (start + len > s.size())
            return false;

        // Leading zero check
        if (len > 1 && s[start] == '0')
            return false;

        int num = 0;

        // Convert substring to number
        for (int i = start; i < start + len; i++)
        {
            num = num * 10 + (s[i] - '0');
        }

        return num <= 255;
    }

    void backtrack(string &s, int index, int parts, string current, vector<string> &result)
    {

        // If 4 parts formed and string consumed
        if (parts == 4 && index == s.size())
        {
            current.pop_back(); // remove last dot
            result.push_back(current);
            return;
        }

        // If invalid condition
        if (parts >= 4)
            return;

        // Try segment length 1 to 3
        for (int len = 1; len <= 3; len++)
        {

            if (isValid(s, index, len))
            {

                string segment = s.substr(index, len);

                backtrack(
                    s,
                    index + len,
                    parts + 1,
                    current + segment + ".",
                    result);
            }
        }
    }

    vector<string> generateIp(string &s)
    {

        vector<string> result;

        backtrack(s, 0, 0, "", result);

        return result;
    }
};