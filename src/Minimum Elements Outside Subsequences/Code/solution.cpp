class Solution
{
public:
    int minCount(vector<int> &arr)
    {
        int n = arr.size();          // Store the number of elements in the array.
        const int NEG = -1000000000; // Represents a state that cannot be reached.

        // prev[i][j] stores the maximum number of used elements after
        // processing the previous prefix, where i and j are the last
        // indices of the increasing and decreasing subsequences.
        vector<vector<int>> prev(n + 1, vector<int>(n + 1, NEG));

        prev[0][0] = 0; // Initially both subsequences are empty.

        // Process every array element one by one.
        for (int k = 1; k <= n; ++k)
        {
            // cur will contain all states after processing arr[k - 1].
            vector<vector<int>> cur(n + 1, vector<int>(n + 1, NEG));

            // Try every possible pair of last indices from the previous state.
            for (int i = 0; i <= n; ++i)
            {
                for (int j = 0; j <= n; ++j)
                {
                    if (prev[i][j] == NEG)
                    {
                        continue; // Ignore states that were never reachable.
                    }

                    // Option 1: Leave the current element unused.
                    cur[i][j] = max(cur[i][j], prev[i][j]);

                    // Option 2: Put the current element into the increasing subsequence.
                    // It is valid if that subsequence is empty or arr[k-1] is larger
                    // than its previous last element.
                    if (i == 0 || arr[k - 1] > arr[i - 1])
                    {
                        cur[k][j] = max(cur[k][j], prev[i][j] + 1);
                    }

                    // Option 3: Put the current element into the decreasing subsequence.
                    // It is valid if that subsequence is empty or arr[k-1] is smaller
                    // than its previous last element.
                    if (j == 0 || arr[k - 1] < arr[j - 1])
                    {
                        cur[i][k] = max(cur[i][k], prev[i][j] + 1);
                    }
                }
            }

            // The current layer becomes the previous layer for the next element.
            prev = move(cur);
        }

        int best = 0; // Store the maximum number of elements included in both subsequences.

        // Find the best reachable state after processing the whole array.
        for (int i = 0; i <= n; ++i)
        {
            for (int j = 0; j <= n; ++j)
            {
                best = max(best, prev[i][j]);
            }
        }

        // The elements not used in either subsequence are the required answer.
        return n - best;
    }
};