import java.util.*;
class Solution {
    public ArrayList<Long> constructArr(long[] arr) {
        int m = arr.length;
        long disc = 1L + 8L * m;
        long sq = (long) Math.sqrt(disc);
        long n = (1 + sq) / 2;

        ArrayList<Long> resList = new ArrayList<>();
        if (n < 2) return resList;

        if (n == 2) {
            resList.add(arr[0]);
            resList.add(0L);
            return resList;
        }

        long s01 = arr[0];
        long s02 = arr[1];
        long s12 = arr[(int)(n - 1)];

        long res0 = (s01 + s02 - s12) / 2;

        resList.add(res0);
        for (int i = 1; i < n; ++i) {
            long val = arr[i - 1] - res0; // arr[i-1] = res0 + res[i]
            resList.add(val);
        }
        return resList;
    }
}
