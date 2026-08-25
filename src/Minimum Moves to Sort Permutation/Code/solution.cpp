class Solution
{
public:
    int minMoves(vector<int> &arr)
    {
        int n = arr.size(); // Store the total number of elements in the permutation.

        vector<int> pos(n + 1); // pos[value] stores the current index of that value.

        for (int i = 0; i < n; i++)
        {
            pos[arr[i]] = i; // Record where each value appears so positions can be checked in O(1).
        }

        int current = 1; // Every single value is already a valid consecutive sequence of length 1.
        int longest = 1; // Store the maximum valid sequence length found so far.

        for (int value = 1; value < n; value++)
        {
            // If value and value + 1 already appear from left to right,
            // both can stay untouched in the sorted array.
            if (pos[value] < pos[value + 1])
            {
                current++; // Extend the current consecutive sequence.
            }
            else
            {
                current = 1; // Their order is wrong, so a new sequence starts here.
            }

            longest = max(longest, current); // Keep the best sequence length.
        }

        return n - longest; // Move every element that cannot remain in the longest valid sequence.
    }
};