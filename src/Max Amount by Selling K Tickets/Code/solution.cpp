class Solution {
  public:
    int maxAmount(vector<int>& arr, int k) {
        // Modulo value given in the problem
        const int MOD = 1000000007;

        // Max heap to always get the seller with maximum tickets
        priority_queue<int> pq;

        // Insert all sellers into the heap
        for (int x : arr)
            if (x > 0)
                pq.push(x);

        long long ans = 0;

        // Sell at most k tickets
        while (k-- && !pq.empty()) {

            // Seller with highest current ticket count
            int cur = pq.top();
            pq.pop();

            // Add current ticket price
            ans = (ans + cur) % MOD;

            // One ticket is sold, so remaining tickets decrease by 1
            cur--;

            // Put seller back only if tickets are still left
            if (cur > 0)
                pq.push(cur);
        }

        // Return answer modulo MOD
        return (int)ans;
    }
};