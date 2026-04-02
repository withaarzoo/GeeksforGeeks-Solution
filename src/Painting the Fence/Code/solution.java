class Solution {
    int countWays(int n, int k) {
        // If there is only one post
        if (n == 1)
            return k;

        // same = ways where last two posts have same color
        long same = k;

        // diff = ways where last two posts have different colors
        long diff = (long) k * (k - 1);

        // Process from 3rd post to nth post
        for (int i = 3; i <= n; i++) {
            long newSame = diff;
            long newDiff = (same + diff) * (k - 1);

            same = newSame;
            diff = newDiff;
        }

        return (int) (same + diff);
    }
}