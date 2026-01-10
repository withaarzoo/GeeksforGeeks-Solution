class Solution
{
public:
    // Helper function to count substrings with at most k distinct characters
    int atMostK(string &s, int k)
    {
        if (k < 0)
            return 0;

        int freq[26] = {0};
        int left = 0, distinct = 0, count = 0;

        for (int right = 0; right < s.size(); right++)
        {
            // Add current character
            if (freq[s[right] - 'a'] == 0)
                distinct++;
            freq[s[right] - 'a']++;

            // Shrink window if distinct characters exceed k
            while (distinct > k)
            {
                freq[s[left] - 'a']--;
                if (freq[s[left] - 'a'] == 0)
                    distinct--;
                left++;
            }

            // All substrings ending at right are valid
            count += (right - left + 1);
        }

        return count;
    }

    int countSubstr(string &s, int k)
    {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
};
