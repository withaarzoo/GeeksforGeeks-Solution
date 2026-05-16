class Solution
{
public:
    int findSmallest(vector<int> &arr)
    {

        // Sort the array so smaller values come first
        sort(arr.begin(), arr.end());

        // This stores the smallest value
        // that cannot currently be formed
        long long smallestMissing = 1;

        // Traverse every number in sorted order
        for (int num : arr)
        {

            // If current number is greater than the
            // smallest missing value, then we found a gap
            if (num > smallestMissing)
            {
                break;
            }

            // Otherwise, extend the reachable range
            smallestMissing += num;
        }

        // Final answer
        return smallestMissing;
    }
};