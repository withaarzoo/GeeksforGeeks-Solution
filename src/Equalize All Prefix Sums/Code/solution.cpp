class Solution
{
public:
    vector<int> optimalArray(vector<int> &arr)
    {
        int n = arr.size();

        // Prefix sums for fast range sum queries
        vector<long long> pref(n + 1, 0);

        for (int i = 0; i < n; i++)
        {
            pref[i + 1] = pref[i] + arr[i];
        }

        vector<int> ans(n);

        for (int i = 0; i < n; i++)
        {

            // Median position in current prefix
            int mid = i / 2;

            long long median = arr[mid];

            // Cost to make left part equal to median
            long long leftCost =
                median * (mid + 1LL) - pref[mid + 1];

            // Cost to make right part equal to median
            long long rightCost =
                (pref[i + 1] - pref[mid + 1]) -
                median * (i - mid);

            ans[i] = (int)(leftCost + rightCost);
        }

        return ans;
    }
};