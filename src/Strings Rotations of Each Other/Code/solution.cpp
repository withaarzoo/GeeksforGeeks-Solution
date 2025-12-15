class Solution
{
public:
    bool areRotations(string &s1, string &s2)
    {
        // Step 1: Length check
        if (s1.length() != s2.length())
            return false;

        // Step 2: Concatenate s1 with itself
        string temp = s1 + s1;

        // Step 3: Check if s2 exists in temp
        return (temp.find(s2) != string::npos);
    }
};
