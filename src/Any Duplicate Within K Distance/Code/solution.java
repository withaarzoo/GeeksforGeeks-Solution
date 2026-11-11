class Solution {
    public boolean checkWithinK(int[] arr, int k) {
        Set<Integer> window = new HashSet<>();
        for (int i = 0; i < arr.length; i++) {
            if (window.contains(arr[i])) return true;
            window.add(arr[i]);
            if (window.size() > k) {
                window.remove(arr[i - k]);
            }
        }
        return false;
    }
}