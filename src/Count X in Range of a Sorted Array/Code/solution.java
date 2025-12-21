class Solution {

    int firstOccurrence(int[] arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                r = mid - 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    int lastOccurrence(int[] arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                l = mid + 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    public ArrayList<Integer> countXInRange(int[] arr, int[][] queries) {
        ArrayList<Integer> result = new ArrayList<>();

        for (int[] q : queries) {
            int l = q[0], r = q[1], x = q[2];

            int first = firstOccurrence(arr, l, r, x);
            if (first == -1) {
                result.add(0);
                continue;
            }

            int last = lastOccurrence(arr, l, r, x);
            result.add(last - first + 1);
        }

        return result;
    }
}
