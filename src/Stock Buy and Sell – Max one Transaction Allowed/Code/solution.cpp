class Solution {
  public:
    int maxProfit(vector<int> &prices) {
        int minPrice = prices[0];   // Lowest price so far
        int maxProfit = 0;          // Best profit so far

        for (int i = 1; i < prices.size(); i++) {
            // If current price is cheaper, update buying price
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            }
            // Otherwise, try selling today
            else {
                maxProfit = max(maxProfit, prices[i] - minPrice);
            }
        }

        return maxProfit;
    }
};
