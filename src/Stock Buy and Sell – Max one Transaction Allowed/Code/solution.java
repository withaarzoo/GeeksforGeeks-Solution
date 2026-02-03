class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = prices[0]; // Lowest price till now
        int maxProfit = 0; // Maximum profit

        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            }
        }

        return maxProfit;
    }
}
