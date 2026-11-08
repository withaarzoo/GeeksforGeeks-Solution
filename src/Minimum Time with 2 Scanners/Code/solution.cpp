class Solution {
  public:
    int minTime(int n, int s1, int s2) {
        long long low = 0;
        long long high = 1LL * min(s1, s2) * n;
        while (low < high) {
            long long mid = low + (high - low) / 2;
            if (mid / s1 + mid / s2 >= n)
                high = mid;
            else
                low = mid + 1;
        }
        return (int)low;
    }
};