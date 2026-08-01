class Solution
{
public:
    int findMax(int n, vector<int> &a, vector<int> &b, vector<int> &k)
    {

        // Difference array to store range updates
        vector<long long> diff(n + 1, 0);

        // Apply every range update in O(1)
        for (int i = 0; i < a.size(); i++)
        {

            // Increment starts from a[i]
            diff[a[i]] += k[i];

            // Stop increment after b[i]
            if (b[i] + 1 < n)
                diff[b[i] + 1] -= k[i];
        }

        long long current = 0;
        long long maximum = 0;

        // Build the final array using prefix sum
        for (int i = 0; i < n; i++)
        {

            // Current value at this index
            current += diff[i];

            // Update maximum value found so far
            maximum = max(maximum, current);
        }

        return (int)maximum;
    }
};