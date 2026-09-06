class Solution {
  public:
    long long pairAndSum(vector<int> &arr) {
        // I store the final sum in long long because the answer can be
        // much larger than the maximum value of a single array element.
        long long ans = 0;

        // I check each bit independently.
        // 31 bits are enough for the given constraint arr[i] <= 10^8.
        for (int bit = 0; bit < 31; bit++) {
            // I count how many numbers have the current bit set.
            long long count = 0;

            // I examine every array element for the current bit.
            for (int x : arr) {
                // If the current bit is 1, this number can form a pair
                // whose AND also has this bit set.
                if (x & (1LL << bit)) {
                    count++;
                }
            }

            // Any two numbers among these count numbers will have
            // the current bit set in their bitwise AND.
            long long pairs = count * (count - 1) / 2;

            // Each occurrence of this bit contributes 2^bit to the answer.
            ans += pairs * (1LL << bit);
        }

        // I return the sum of pairwise AND values.
        return ans;
    }
};