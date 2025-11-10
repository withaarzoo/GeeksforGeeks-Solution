class Solution {
    public int maxProfit(int arr[]) {
        int n = arr.length;
        if (n == 0)
            return 0;

        int hold = -arr[0]; // holding a stock
        int sold = Integer.MIN_VALUE; // sold today (cooldown tomorrow)
        int rest = 0; // not holding and not in cooldown

        for (int i = 1; i < n; i++) {
            int price = arr[i];

            int newHold = Math.max(hold, rest - price); // buy or keep holding
            int newSold = hold + price; // sell from hold
            int newRest = Math.max(rest, sold); // keep rest or finish cooldown

            hold = newHold;
            sold = newSold;
            rest = newRest;
        }

        return Math.max(sold, rest);
    }
}
