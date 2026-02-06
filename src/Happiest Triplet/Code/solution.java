class Solution {
    int[] smallestDiff(int a[], int b[], int c[]) {
        Arrays.sort(a);
        Arrays.sort(b);
        Arrays.sort(c);

        int i = 0, j = 0, k = 0;
        long bestDiff = Long.MAX_VALUE;
        long bestSum = Long.MAX_VALUE;
        int[] ans = new int[3];

        while (i < a.length && j < b.length && k < c.length) {
            int x = a[i], y = b[j], z = c[k];

            int mx = Math.max(x, Math.max(y, z));
            int mn = Math.min(x, Math.min(y, z));

            long diff = mx - mn;
            long sum = (long)x + y + z;

            if (diff < bestDiff || (diff == bestDiff && sum < bestSum)) {
                bestDiff = diff;
                bestSum = sum;
                ans[0] = x;
                ans[1] = y;
                ans[2] = z;
            }

            if (mn == x) i++;
            else if (mn == y) j++;
            else k++;
        }

        Arrays.sort(ans);
        return new int[]{ans[2], ans[1], ans[0]}; // decreasing order
    }
}
