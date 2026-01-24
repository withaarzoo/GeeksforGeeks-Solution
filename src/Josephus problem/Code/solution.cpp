class Solution
{
public:
    int josephus(int n, int k)
    {
        // Base case: only one person
        int ans = 0; // 0-based index

        // Build the solution from 2 to n
        for (int i = 2; i <= n; i++)
        {
            ans = (ans + k) % i;
        }

        // Convert 0-based index to 1-based index
        return ans + 1;
    }
};
