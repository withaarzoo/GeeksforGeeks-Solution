class Solution {
    public int countSubset(int[] arr, int k) {
        int n = arr.length;
        int mid = n / 2;

        int[] left = new int[mid];
        int[] right = new int[n - mid];

        for (int i = 0; i < mid; i++) left[i] = arr[i];
        for (int i = mid; i < n; i++) right[i - mid] = arr[i];

        ArrayList<Long> leftSums = new ArrayList<>();
        ArrayList<Long> rightSums = new ArrayList<>();

        // Left subset sums
        for (int mask = 0; mask < (1 << left.length); mask++) {
            long sum = 0;
            for (int i = 0; i < left.length; i++) {
                if ((mask & (1 << i)) != 0)
                    sum += left[i];
            }
            leftSums.add(sum);
        }

        // Right subset sums
        for (int mask = 0; mask < (1 << right.length); mask++) {
            long sum = 0;
            for (int i = 0; i < right.length; i++) {
                if ((mask & (1 << i)) != 0)
                    sum += right[i];
            }
            rightSums.add(sum);
        }

        HashMap<Long, Integer> freq = new HashMap<>();
        for (long s : rightSums)
            freq.put(s, freq.getOrDefault(s, 0) + 1);

        int count = 0;
        for (long s : leftSums) {
            long need = k - s;
            count += freq.getOrDefault(need, 0);
        }

        return count;
    }
}
