class Solution {
    public ArrayList<Integer> lexicographicallyLargest(int[] arr) {
        int n = arr.length;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j + 1 < n && (arr[j] % 2 == arr[j + 1] % 2)) {
                j++;
            }
            Arrays.sort(arr, i, j + 1);
            for (int left = i, right = j; left < right; left++, right--) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
            }
            i = j + 1;
        }
        ArrayList<Integer> res = new ArrayList<>();
        for (int val : arr) res.add(val);
        return res;
    }
}