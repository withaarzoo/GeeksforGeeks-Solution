class Solution
{
public:
    // Recursive function to build increasing numbers
    void solve(int lastDigit, int len, int n, int num, vector<int> &ans)
    {
        // If the required length is reached, store the number
        if (len == n)
        {
            ans.push_back(num);
            return;
        }

        // Try every digit greater than the previous digit
        for (int d = lastDigit + 1; d <= 9; d++)
        {
            // Append the current digit and continue recursion
            solve(d, len + 1, n, num * 10 + d, ans);
        }
    }

    vector<int> increasingNumbers(int n)
    {
        vector<int> ans;

        // More than 10 unique digits are impossible
        if (n > 10)
            return ans;

        // Every single digit is a valid answer
        if (n == 1)
        {
            for (int i = 0; i <= 9; i++)
                ans.push_back(i);
            return ans;
        }

        // Start every number with digits 1 to 9
        for (int d = 1; d <= 9; d++)
        {
            solve(d, 1, n, d, ans);
        }

        return ans;
    }
};