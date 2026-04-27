class Solution
{
public:
    int smallestSubstring(string s)
    {
        int n = s.size();
        int count[3] = {0, 0, 0};

        int left = 0;
        int ans = INT_MAX;

        for (int right = 0; right < n; right++)
        {
            count[s[right] - '0']++; // include current character

            // Check if window is valid
            while (count[0] > 0 && count[1] > 0 && count[2] > 0)
            {
                ans = min(ans, right - left + 1);

                count[s[left] - '0']--; // remove left character
                left++;                 // shrink window
            }
        }

        return (ans == INT_MAX) ? -1 : ans;
    }
};