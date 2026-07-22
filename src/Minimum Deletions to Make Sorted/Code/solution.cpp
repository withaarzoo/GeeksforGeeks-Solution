class Solution
{
public:
    int minDeletions(vector<int> &arr)
    {
        // This array stores the smallest possible ending value
        // for increasing subsequences of different lengths.
        vector<int> lis;

        // Process every element in the array.
        for (int num : arr)
        {

            // If the current number is greater than the last value,
            // it can extend the current longest increasing subsequence.
            if (lis.empty() || num > lis.back())
            {
                lis.push_back(num);
            }
            else
            {

                // Find the first element that is greater than or equal
                // to the current number.
                auto it = lower_bound(lis.begin(), lis.end(), num);

                // Replace it with the current number.
                // This keeps the ending value as small as possible.
                *it = num;
            }
        }

        // Elements not belonging to LIS must be deleted.
        return arr.size() - lis.size();
    }
};