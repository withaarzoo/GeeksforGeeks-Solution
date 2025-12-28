class Solution {
public:
    bool canMake(vector<int>& ranks, int n, long long time) {
        long long donuts = 0;

        for (int r : ranks) {
            long long k = 0;
            long long currTime = 0;

            // Count how many donuts this chef can make
            while (true) {
                currTime += r * (k + 1);
                if (currTime > time) break;
                k++;
            }

            donuts += k;
            if (donuts >= n) return true;
        }
        return false;
    }

    int minTime(vector<int>& ranks, int n) {
        int minRank = *min_element(ranks.begin(), ranks.end());
        long long low = 0;
        long long high = 1LL * minRank * n * (n + 1) / 2;
        long long ans = high;

        while (low <= high) {
            long long mid = (low + high) / 2;

            if (canMake(ranks, n, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
