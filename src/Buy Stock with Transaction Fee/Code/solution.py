class Solution:
    def maxProfit(self, arr, k):
        # hold = maximum profit when I currently have a stock
        hold = -arr[0]
        
        # cash = maximum profit when I do not have a stock
        cash = 0
        
        for i in range(1, len(arr)):
            # Save previous cash because hold depends on old cash
            prev_cash = cash
            
            # Either keep holding previous stock
            # Or buy stock today
            hold = max(hold, prev_cash - arr[i])
            
            # Either keep previous cash
            # Or sell stock today and pay transaction fee
            cash = max(cash, hold + arr[i] - k)
        
        return cash