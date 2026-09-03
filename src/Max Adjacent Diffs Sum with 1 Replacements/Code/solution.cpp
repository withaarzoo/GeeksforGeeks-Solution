class Solution
{
public:
    int maxDiffSum(vector<int> &arr)
    {
        // keep stores the best sum when the previous element is kept unchanged.
        long long keep = 0;

        // replace stores the best sum when the previous element is replaced by 1.
        long long replace = 0;

        // Start from the second element because the first element has no adjacent difference.
        for (int i = 1; i < arr.size(); i++)
        {
            // Calculate the best sum if arr[i] is kept unchanged.
            // The previous element can either be kept or replaced by 1.
            long long newKeep = max(
                keep + abs(arr[i] - arr[i - 1]),
                replace + abs(arr[i] - 1));

            // Calculate the best sum if arr[i] is replaced by 1.
            // If the previous element is kept, the difference is |1 - arr[i-1]|.
            // If the previous element was also replaced, the difference is |1 - 1| = 0.
            long long newReplace = max(
                keep + abs(1 - arr[i - 1]),
                replace);

            // Move the current states to the previous states for the next position.
            keep = newKeep;
            replace = newReplace;
        }

        // The final element can be either kept or replaced, so take the better state.
        return (int)max(keep, replace);
    }
};