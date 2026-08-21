class Solution
{
public:
    int transform(string &s1, string &s2)
    {
        // Store the common string length after checking both strings.
        int n = s1.size();

        // Moving a character does not change string length,
        // so different lengths can never be transformed into each other.
        if (n != (int)s2.size())
        {
            return -1;
        }

        // Use a fixed-size array to compare character frequencies.
        // A fixed 256-size array keeps the auxiliary space O(1).
        int freq[256] = {0};

        // Add frequencies from s1 and subtract frequencies from s2.
        // If both strings contain the same characters with the same counts,
        // every value will become zero.
        for (int i = 0; i < n; i++)
        {
            freq[(unsigned char)s1[i]]++;
            freq[(unsigned char)s2[i]]--;
        }

        // Check whether both strings are made from exactly the same characters.
        for (int i = 0; i < 256; i++)
        {
            if (freq[i] != 0)
            {
                return -1;
            }
        }

        // Start from the end because characters that are not moved
        // keep their relative order and form the final unchanged suffix.
        int i = n - 1;
        int j = n - 1;
        int operations = 0;

        // Match s2 from right to left.
        while (i >= 0 && j >= 0)
        {
            // If both characters match, this character can stay in place.
            if (s1[i] == s2[j])
            {
                i--;
                j--;
            }
            else
            {
                // Otherwise, s1[i] must be moved to the front,
                // so count one operation and skip it in s1.
                operations++;
                i--;
            }
        }

        // Return the minimum number of characters that must be moved.
        return operations;
    }
};