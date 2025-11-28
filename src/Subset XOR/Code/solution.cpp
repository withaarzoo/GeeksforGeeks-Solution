class Solution
{
public:
    vector<int> subsetXOR(int n)
    {
        long long T;
        // XOR of 1..n using known pattern
        if (n % 4 == 0)
            T = n;
        else if (n % 4 == 1)
            T = 1;
        else if (n % 4 == 2)
            T = n + 1;
        else
            T = 0; // n % 4 == 3

        vector<int> ans;

        if (T == n)
        {
            // Case 1: we can take all numbers 1..n
            for (int i = 1; i <= n; ++i)
                ans.push_back(i);
        }
        else
        {
            // Case 2: remove exactly one element x = T ^ n
            int x = (int)(T ^ n);
            for (int i = 1; i <= n; ++i)
            {
                if (i == x)
                    continue; // skip x
                ans.push_back(i);
            }
        }

        return ans;
    }
};
