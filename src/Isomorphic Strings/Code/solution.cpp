class Solution
{
public:
    bool areIsomorphic(string &s1, string &s2)
    {
        // If lengths are not equal, they cannot be isomorphic
        if (s1.length() != s2.length())
            return false;

        // Mapping arrays (ASCII size)
        vector<int> map1(256, -1); // s1 -> s2
        vector<int> map2(256, -1); // s2 -> s1

        for (int i = 0; i < s1.length(); i++)
        {
            char c1 = s1[i];
            char c2 = s2[i];

            // If both characters are not mapped yet
            if (map1[c1] == -1 && map2[c2] == -1)
            {
                map1[c1] = c2;
                map2[c2] = c1;
            }
            // If mapping exists, it must be consistent
            else
            {
                if (map1[c1] != c2 || map2[c2] != c1)
                    return false;
            }
        }

        return true;
    }
};