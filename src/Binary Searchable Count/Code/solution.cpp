class Solution
{
public:
    int binarySearchable(vector<int> &arr)
    {
        // I store the final count here and update it while traversing the binary-search tree.
        int count = 0;
        int n = (int)arr.size();

        // I use a recursive lambda to walk the same index tree that binary search creates.
        function<void(int, int, long long, long long)> dfs =
            [&](int l, int r, long long low, long long high)
        {
            // If the segment is empty, there is nothing to process.
            if (l > r)
                return;

            // I pick the middle index because binary search always checks this first.
            int mid = l + (r - l) / 2;
            long long val = arr[mid];

            // If the current value fits all ancestor constraints, then it is searchable.
            if (val > low && val < high)
            {
                count++;
            }

            // Everything on the left must be smaller than the current middle value.
            dfs(l, mid - 1, low, min(high, val));

            // Everything on the right must be larger than the current middle value.
            dfs(mid + 1, r, max(low, val), high);
        };

        // I start with no lower or upper restriction at the root.
        dfs(0, n - 1, -(1LL << 60), (1LL << 60));

        return count;
    }
};