class Solution
{
public:
    // Segment tree to store LCM values
    vector<long long> seg;

    // Function to calculate GCD
    long long gcd(long long a, long long b)
    {
        while (b)
        {
            long long temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Function to calculate LCM safely
    long long lcm(long long a, long long b)
    {
        return (a / gcd(a, b)) * b;
    }

    // Build segment tree
    void build(int idx, int low, int high, vector<int> &arr)
    {

        // Leaf node stores array value
        if (low == high)
        {
            seg[idx] = arr[low];
            return;
        }

        int mid = (low + high) / 2;

        // Build left subtree
        build(2 * idx + 1, low, mid, arr);

        // Build right subtree
        build(2 * idx + 2, mid + 1, high, arr);

        // Store LCM of both children
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Update one index
    void update(int idx, int low, int high, int pos, int val)
    {

        // Reached target index
        if (low == high)
        {
            seg[idx] = val;
            return;
        }

        int mid = (low + high) / 2;

        // Go to left side
        if (pos <= mid)
            update(2 * idx + 1, low, mid, pos, val);

        // Go to right side
        else
            update(2 * idx + 2, mid + 1, high, pos, val);

        // Recalculate current node
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Query LCM in range
    long long query(int idx, int low, int high, int l, int r)
    {

        // Completely outside range
        if (high < l || low > r)
            return 1;

        // Completely inside range
        if (low >= l && high <= r)
            return seg[idx];

        int mid = (low + high) / 2;

        // Query left part
        long long left = query(2 * idx + 1, low, mid, l, r);

        // Query right part
        long long right = query(2 * idx + 2, mid + 1, high, l, r);

        // Merge both answers using LCM
        return lcm(left, right);
    }

    vector<long long> RangeLCMQuery(vector<int> &arr, vector<vector<int>> &queries)
    {

        int n = arr.size();

        // Allocate segment tree space
        seg.resize(4 * n);

        // Build tree initially
        build(0, 0, n - 1, arr);

        vector<long long> ans;

        // Process all queries
        for (auto &q : queries)
        {

            // Update query
            if (q[0] == 1)
            {
                update(0, 0, n - 1, q[1], q[2]);
            }

            // Range query
            else
            {
                ans.push_back(query(0, 0, n - 1, q[1], q[2]));
            }
        }

        return ans;
    }
};