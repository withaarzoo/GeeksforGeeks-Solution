class Solution
{
public:
    bool canFormPalindrome(string &s)
    {
        // Frequency array for 26 lowercase letters
        int freq[26] = {0};

        // Count frequency of each character
        for (char ch : s)
        {
            freq[ch - 'a']++;
        }

        // Count how many characters have odd frequency
        int oddCount = 0;

        for (int i = 0; i < 26; i++)
        {
            if (freq[i] % 2 != 0)
            {
                oddCount++;
            }

            // More than one odd frequency means palindrome is not possible
            if (oddCount > 1)
            {
                return false;
            }
        }

        return true;
    }
};