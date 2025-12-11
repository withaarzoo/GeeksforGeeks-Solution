import java.util.ArrayList;

class Solution {
    public ArrayList<Integer> constructArr(int[] arr) {
        ArrayList<Integer> res = new ArrayList<>();
        int m = arr.length;
        if (m == 0) return res;

        long disc = 1L + 8L * m;
        long s = (long) Math.sqrt(disc);
        int n = (int) ((1 + s) / 2);

        if (n == 2) {
            res.add(0);
            res.add(arr[0]);
            return res;
        }

        long s01 = arr[0];
        long s02 = arr[1];
        long s12 = arr[n - 1];

        long r0 = (s01 + s02 - s12) / 2L;

        res.add((int) r0);
        for (int i = 1; i < n; i++) {
            long val = (long) arr[i - 1] - r0;
            res.add((int) val);
        }
        return res;
    }
}
