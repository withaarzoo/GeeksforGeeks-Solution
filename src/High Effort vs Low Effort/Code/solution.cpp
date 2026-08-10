class Solution
{
public:
    int maxTask(vector<int> &h, vector<int> &l)
    {
        // n represents the total number of available days.
        int n = h.size();

        // For day 0, I can directly choose either high-effort or low-effort.
        // I take whichever gives more tasks.
        int prev1 = max(h[0], l[0]);

        // This represents the answer before day 0.
        // It acts as dp[-1] = 0 for the first high-effort choice.
        int prev2 = 0;

        // I process every remaining day one by one.
        for (int i = 1; i < n; i++)
        {
            // If I choose the low-effort task today,
            // I can use the best result from yesterday.
            int lowChoice = prev1 + l[i];

            // If I choose the high-effort task today,
            // yesterday must be skipped, so I use the result from i - 2.
            int highChoice = prev2 + h[i];

            // The better of the two choices is the best result up to today.
            int current = max(lowChoice, highChoice);

            // Move the previous states forward for the next day.
            prev2 = prev1;
            prev1 = current;
        }

        // prev1 now contains the maximum tasks possible over all days.
        return prev1;
    }
};