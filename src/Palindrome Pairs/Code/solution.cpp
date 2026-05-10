class Solution
{
public:
    // Function to check whether a string is palindrome
    bool isPalindrome(string &s, int left, int right)
    {

        // Compare characters from both ends
        while (left < right)
        {

            // If mismatch found, not palindrome
            if (s[left] != s[right])
            {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    bool palindromePair(vector<string> &arr)
    {

        // Store every string with its index
        unordered_map<string, int> mp;

        for (int i = 0; i < arr.size(); i++)
        {
            mp[arr[i]] = i;
        }

        // Traverse every word
        for (int i = 0; i < arr.size(); i++)
        {

            string word = arr[i];
            int n = word.length();

            // Try every possible split
            for (int j = 0; j <= n; j++)
            {

                // Left and right parts
                string left = word.substr(0, j);
                string right = word.substr(j);

                // CASE 1:
                // If left part is palindrome
                if (isPalindrome(word, 0, j - 1))
                {

                    // Reverse the right part
                    string revRight = right;
                    reverse(revRight.begin(), revRight.end());

                    // Check if reversed right exists
                    if (mp.count(revRight) && mp[revRight] != i)
                    {
                        return true;
                    }
                }

                // CASE 2:
                // Avoid duplicate checking when right is empty
                if (j != n && isPalindrome(word, j, n - 1))
                {

                    // Reverse the left part
                    string revLeft = left;
                    reverse(revLeft.begin(), revLeft.end());

                    // Check if reversed left exists
                    if (mp.count(revLeft) && mp[revLeft] != i)
                    {
                        return true;
                    }
                }
            }
        }

        return false;
    }
};