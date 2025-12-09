class Solution
{
public:
    vector<int> findDuplicates(vector<int> &arr)
    {
        int n = arr.size();
        vector<int> ans;

        // Traverse the array
        for (int i = 0; i < n; i++)
        {
            int x = abs(arr[i]); // value in range [1, n]
            int idx = x - 1;     // mapped index

            // If arr[idx] is positive, this is the first time we see x
            if (arr[idx] > 0)
            {
                arr[idx] = -arr[idx]; // mark as seen by making it negative
            }
            else
            {
                // arr[idx] already negative -> x is seen before -> duplicate
                ans.push_back(x);
            }
        }

        // We can return in any order; driver will sort if needed.
        return ans;
    }
};
