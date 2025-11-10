class Solution
{
public:
    int maxProfit(vector<int> &arr)
    {
        int n = (int)arr.size();
        if (n == 0)
            return 0;

        // States:
        // hold: best profit ending the day holding a stock
        // sold: best profit if I sell today (tomorrow will be cooldown)
        // rest: best profit ending the day without stock and not in cooldown
        int hold = -arr[0];
        int sold = INT_MIN; // impossible on day 0
        int rest = 0;

        for (int i = 1; i < n; ++i)
        {
            int price = arr[i];

            int newHold = max(hold, rest - price); // keep holding or buy today
            int newSold = hold + price;            // must have held yesterday
            int newRest = max(rest, sold);         // keep resting or cooldown over

            hold = newHold;
            sold = newSold;
            rest = newRest;
        }

        // Best profit ends with no stock in hand
        return max(sold, rest);
    }
};
