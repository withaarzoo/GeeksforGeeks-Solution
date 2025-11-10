class Solution:
    def maxProfit(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        hold = -arr[0]            # end of day while holding a stock
        sold = float('-inf')      # sold today, cooldown tomorrow
        rest = 0                  # free (not holding, not cooldown)

        for i in range(1, n):
            price = arr[i]
            new_hold = max(hold, rest - price)  # buy or keep holding
            new_sold = hold + price             # sell from hold
            new_rest = max(rest, sold)          # keep rest or finish cooldown

            hold, sold, rest = new_hold, new_sold, new_rest

        return max(sold, rest)
