class Solution {

    // Function to calculate digit sum
    private long digitSum(long x) {
        long sum = 0;
        while (x > 0) {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }

    public int getCount(int n, int d) {
        long left = 1, right = n;
        long ans = -1;

        // Binary Search
        while (left <= right) {
            long mid = left + (right - left) / 2;

            if (mid - digitSum(mid) >= d) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (ans == -1)
            return 0;

        return (int) (n - ans + 1);
    }
}
