class Solution
{
public:
    int longestKSubstr(string &s, int k)
    {

        unordered_map<char, int> freq;
        int left = 0;
        int maxLen = -1;

        for (int right = 0; right < s.size(); right++)
        {

            // Add current character to frequency map
            freq[s[right]]++;

            // If unique characters exceed k, shrink window
            while (freq.size() > k)
            {
                freq[s[left]]--;

                if (freq[s[left]] == 0)
                {
                    freq.erase(s[left]);
                }

                left++;
            }

            // If exactly k unique characters
            if (freq.size() == k)
            {
                maxLen = max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
};