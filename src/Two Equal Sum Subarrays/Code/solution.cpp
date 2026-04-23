class Solution
{
public:
    bool canSplit(vector<int> &arr)
    {
        long long total = 0;

        // Step 1: Calculate total sum
        for (int x : arr)
            total += x;

        // Step 2: If total is odd, can't split
        if (total % 2 != 0)
            return false;

        long long target = total / 2;
        long long curr = 0;

        // Step 3: Traverse and check prefix sum
        for (int i = 0; i < arr.size(); i++)
        {
            curr += arr[i];

            if (curr == target)
                return true;
        }

        return false;
    }
};