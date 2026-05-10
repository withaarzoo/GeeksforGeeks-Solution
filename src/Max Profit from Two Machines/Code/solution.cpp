class Solution
{
public:
    int maxProfit(int x, int y, vector<int> &a, vector<int> &b)
    {
        int n = a.size();   // Total number of tasks.
        long long base = 0; // Profit if every task is sent to machine B first.
        vector<int> diff;   // Stores extra gain of moving a task from B to A.
        diff.reserve(n);    // Avoid repeated resizing while filling the array.

        for (int i = 0; i < n; i++)
        {
            base += b[i];                // Add B's profit for this task to the base total.
            diff.push_back(a[i] - b[i]); // Store how much better or worse A is than B.
        }

        sort(diff.begin(), diff.end(), greater<int>()); // Largest gain tasks come first.

        int low = max(0, n - y); // Minimum tasks that must go to A so B stays within capacity.
        int high = min(x, n);    // Maximum tasks that can go to A.

        long long running = 0;                           // Sum of the best gains for the current number of A tasks.
        long long bestGain = (low == 0 ? 0 : LLONG_MIN); // Best valid gain found so far.

        for (int i = 0; i < n; i++)
        {
            running += diff[i]; // Gain if I take the first i+1 best tasks for A.
            int taken = i + 1;  // Number of tasks currently assigned to A.

            if (taken >= low && taken <= high)
            {
                bestGain = max(bestGain, running); // Keep the best valid choice.
            }

            if (taken > high)
                break; // No need to check larger counts for A.
        }

        return (int)(base + bestGain); // Final answer = base profit + best extra gain.
    }
};