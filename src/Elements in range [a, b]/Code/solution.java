class Solution {
    public ArrayList<Integer> cntInRange(int[] arr, int[][] queries) {

        // Step 1: Sort array
        Arrays.sort(arr);

        ArrayList<Integer> result = new ArrayList<>();

        for (int[] q : queries) {
            int a = q[0];
            int b = q[1];

            int left = lowerBound(arr, a);
            int right = upperBound(arr, b);

            result.add(right - left);
        }

        return result;
    }

    // First index where value >= target
    private int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < target)
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }

    // First index where value > target
    private int upperBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] <= target)
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }
}
